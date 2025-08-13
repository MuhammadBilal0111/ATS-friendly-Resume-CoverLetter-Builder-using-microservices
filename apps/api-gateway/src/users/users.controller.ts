import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUser } from '@app/common';
import { CreateUserDto } from '../common/dto/create-user.dto';

// Base route: http://localhost:<port>/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST: http://localhost:<port>/users
  @Post()
  public async createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  // GET -> http://localhost:<port>/users
  @Get()
  public async getUsers() {
    return this.usersService.getUsers();
  }
  // GET -> http://localhost:<port>/users/profile
  @Get('profile')
  public async getUserProfile(@ActiveUser('sub') userId: number) {
    return this.usersService.getUserById(userId);
  }
  // DELETE -> http://localhost:<port>/users/:userId
  @Delete(':userId')
  public async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUserById(userId);
  }
}
