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
import { ROUTES } from '../routes.constants';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3001/auth/signup
  @AllowAnonymous()
  @Post('signup')
  public signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @UseInterceptors(CookieInterceptor)
  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK) // send response of status code 200
  // http://localhost:3001/auth/login
  public login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }

  @UseInterceptors(CookieInterceptor)
  @AllowAnonymous()
  @Post('refresh-token')
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
