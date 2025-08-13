import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  DeleteUserByIdDto,
  GetUserByEmail,
  GetUserByIdDto,
  USERS_PATTERNS,
} from '@app/contracts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // intra modular dependency,  here we are asking nestjs to inject an instance of the usersService class in userController using dependency injection

  @MessagePattern(USERS_PATTERNS.CREATE_USER)
  public async createUser(@Payload() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  // In microservices we won't be listening for HTTP requests
  @MessagePattern(USERS_PATTERNS.GET_USERS) // convention domainName.operationName
  public async getUsers() {
    return this.usersService.getAllUsers();
  }

  @MessagePattern(USERS_PATTERNS.GET_USER_BY_ID)
  public async getUserById(@Payload() getUserByIdDto: GetUserByIdDto) {
    return this.usersService.findUserById(getUserByIdDto);
  }

  @MessagePattern(USERS_PATTERNS.DELETE_USER_BY_ID)
  public async deleteUser(@Payload() deleteUserByIdDto: DeleteUserByIdDto) {
    return this.usersService.deleteUserById(deleteUserByIdDto);
  }
  @MessagePattern(USERS_PATTERNS.FIND_USER_BY_EMAIL)
  public async findUserByEmail(getUserByEmail: GetUserByEmail) {
    return this.usersService.findUserByEmail(getUserByEmail);
  }
}
