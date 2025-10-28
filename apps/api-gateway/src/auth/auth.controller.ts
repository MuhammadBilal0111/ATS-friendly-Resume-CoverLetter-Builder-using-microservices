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
import { AllowAnonymous, JwtFromCookie } from '@app/common';
import { CookieInterceptor } from '../common/interceptors/token-cookie.interceptor';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtCookieDto } from './dto/jwt-cookie.dto';
import { ExpireCookieInterceptor } from '../common/interceptors/expires-cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3000/auth/signup
  @AllowAnonymous()
  @Post('register')
  public signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @UseInterceptors(CookieInterceptor)
  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK) // send response of status code 200

  // http://localhost:3000/auth/login
  public login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }

  // http://localhost:3000/auth/refresh-token
  @UseInterceptors(CookieInterceptor)
  @HttpCode(HttpStatus.OK)
  @AllowAnonymous()
  @Post('refresh-token')
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
  // http://localhost:3000/auth/signout
  @UseInterceptors(ExpireCookieInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  public signout(@JwtFromCookie() tokens: JwtCookieDto) {
    return this.authService.signout(tokens);
  }
}
