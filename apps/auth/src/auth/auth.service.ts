import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ActiveUserType,
  CreateUserDto,
  ExistingUserDto,
  JwtDto,
  NOTIFICATION_CLIENT,
  NOTIFICATION_PATTERNS,
  RefreshTokenDto,
  USERS_CLIENT,
  USERS_PATTERNS,
} from '@app/contracts';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AppRpcException, HashingProvider } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy, // for communication from auth to users microservice
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>, // ConfigType is generic type, authConfiguration stores an object that the authconfig returning from the config file
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    /**
     * The notification client is injected via the @Inject decorator. It is
     * used to emit events to the notification microservice.
     */
    @Inject(NOTIFICATION_CLIENT)
    private readonly notificationClient: ClientProxy,
  ) {}

  // function to generate access and refresh accessToken
  private async generateToken(user: any) {
    // generate access accessToken
    const accessToken = await this.signToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.jwt_token_expiresIn,
      { email: user.email },
    );

    // generate refresh accessToken
    const refreshToken = await this.signToken<Partial<ActiveUserType>>( // sign accessToken is of  generic type
      user.id,
      this.authConfiguration.refreshTokenExpiresIn,
    );

    return { accessToken: accessToken, refreshToken };
  }
  // creating the private function
  private async signToken<T>(
    userId: number,
    jwt_token_expiresIn: number,
    payload?: T,
  ) {
    // Generate the JWT
    // provide 2 arguments and 2 is optional
    return await this.jwtService.signAsync(
      // signing process of JWT
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret, // secret key to generate jwt
        expiresIn: jwt_token_expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
      // here the process of signing json web accessToken takes place
    );
  }
  // function to handle sign up
  public async signup(createUserDto: CreateUserDto) {
    try {
      const user = await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.CREATE_USER, createUserDto),
      );
      return {
        user,
        message: 'User created successfully',
        success: true,
      };
    } catch (error) {
      // Expecting the user microservice to send a structured RpcException

      throw new AppRpcException(
        'Signup failed',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  // function to handle log in
  public async login(existingUserDto: ExistingUserDto) {
    try {
      // Validate user credentials and get the user object
      const user = await this.validateUser(existingUserDto);
      const { accessToken, refreshToken } = await this.generateToken(user);
      // emitting the event of send the email
      this.notificationClient.emit(NOTIFICATION_PATTERNS.SEND_WELCOME_EMAIL, {
        to: user.email,
        username: user.username,
      });
      return {
        success: true,
        accessToken,
        refreshToken,
        accessTokenExpiresIn: this.authConfiguration.jwt_token_expiresIn,
        refreshTokenExpiresIn: this.authConfiguration.refreshTokenExpiresIn,
        message: 'User logged in successfully!',
      };
    } catch (error) {
      if (error instanceof AppRpcException) throw error;
      throw new AppRpcException(
        'Login failed',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  public async validateUser(existingUserDto: ExistingUserDto) {
    try {
      const user = await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.FIND_USER_BY_EMAIL, {
          email: existingUserDto.email,
        }),
      );

      const isMatch = await this.hashingProvider.comparePassword(
        existingUserDto.password,
        user.password, // Correct password hash comparison
      );

      if (!isMatch) {
        throw new AppRpcException(
          'Invalid credentials. Please check your email or password.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user; // Return user for further use
    } catch (error) {
      if (error instanceof RpcException) throw error;
      // You can log the error here if needed
      throw new AppRpcException(
        'Failed to validate user credentials.',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || String(error),
      );
    }
  }

  // function to verify jwt
  public async verifyJwt(jwtDto: JwtDto) {
    try {
      // return payload if accessToken is valid, otherwise through an exception
      const payload = await this.jwtService.verifyAsync(
        jwtDto.jwt,
        this.authConfiguration,
      );
      return payload;
    } catch (error) {
      throw new AppRpcException(
        'Authentication failed. Please provide a valid accessToken.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // 1. Verify the refresh token
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );
      return payload;
      // TODO: ACCESS THE USER
      // 2. Find user from DB using id
      // const user = await this.usersService.findUserById(sub);
      // 3. generate access and refresh token
      // return this.generateToken(user);
    } catch (error) {
      throw new AppRpcException(
        'Refresh token is invalid or expired. Please login again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
