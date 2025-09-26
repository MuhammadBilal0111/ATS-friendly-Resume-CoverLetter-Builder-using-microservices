import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_CLIENT, AUTH_PATTERNS } from '@app/contracts';
import { ExistingUserDto } from '../common/dto/existing-user.dto';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}
  public signup(createUserDto: CreateUserDto) {
    // send(pattern, message) patern must be same as define in the auth microservices i.e. auth's controller
    return this.authClient.send(AUTH_PATTERNS.SIGNUP, createUserDto);
  }

  public login(existingUserDto: ExistingUserDto) {
    return this.authClient.send(AUTH_PATTERNS.LOGIN, existingUserDto);
  }

  public refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.authClient.send(AUTH_PATTERNS.REFRESH_TOKEN, refreshTokenDto);
  }
}
