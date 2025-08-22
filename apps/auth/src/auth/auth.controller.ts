import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AUTH_PATTERNS,
  CreateUserDto,
  ExistingUserDto,
  JwtDto,
  RefreshTokenDto,
} from '@app/contracts';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // In micrservice we cannot handle the httpRequest, Microservices recognize both messages and events by patterns.
  // convention domain or microservice.operation name

  // Sign up controller
  @MessagePattern(AUTH_PATTERNS.SIGNUP)
  public async signup(@Payload() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  // Login controller
  @MessagePattern(AUTH_PATTERNS.LOGIN)
  public async login(@Payload() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }
  // Verification of JWT controller
  @UseGuards(JwtAuthGuard)
  @MessagePattern(AUTH_PATTERNS.VERIFY_JWT)
  public async verifyJwt(@Payload() jwtDto: JwtDto) {
    return this.authService.verifyJwt(jwtDto);
  }
  // handler of refresh token
  @MessagePattern(AUTH_PATTERNS.REFRESH_TOKEN)
  public async refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
