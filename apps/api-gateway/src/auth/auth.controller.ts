import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExistingUserDto } from '../common/dto/existing-user.dto';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { AllowAnonymous } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3001/auth/signup
  @AllowAnonymous()
  @Post('signup')
  public async signup(@Body() createUser: CreateUserDto) {
    return await this.authService.signup(createUser);
  }
  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK) // send response of status code 200
  // http://localhost:3001/auth/login
  public async login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }
}
