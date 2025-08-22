import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExistingUserDto } from '../common/dto/existing-user.dto';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { AllowAnonymous } from '@app/common';
import { CookieInterceptor } from '../common/interceptors/token-cookie.interceptor';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3001/auth/signup
  @AllowAnonymous()
  @Post('signup')
  public async signup(@Body() createUser: CreateUserDto) {
    return await this.authService.signup(createUser);
  }
  @UseInterceptors(CookieInterceptor)
  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK) // send response of status code 200
  // http://localhost:3001/auth/login
  public async login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }
  @UseInterceptors(CookieInterceptor)
  @AllowAnonymous()
  @Post('refresh-token')
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
