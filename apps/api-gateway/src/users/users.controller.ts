import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUser, AuthorizeGuard } from '@app/common';
import { CreateUserDto } from '../common/dto/create-user.dto';

// Base route: http://localhost:<port>/
// @UseGuards(AuthorizeGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST: http://localhost:<port>/users
  @Post()
  public createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  // GET -> http://localhost:<port>/users
  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }

  // GET -> http://localhost:<port>/users/profile
  @Get('profile')
  public getUserProfile(@ActiveUser('sub') userId: number) {
    return this.usersService.getUserById(userId);
  }

  // DELETE -> http://localhost:<port>/users/:userId
  @Delete(':userId')
  public deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUserById(userId);
  }
}
