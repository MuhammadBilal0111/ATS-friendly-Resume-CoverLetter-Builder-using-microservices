import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT, USERS_PATTERNS } from '@app/contracts';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
  ) {}

  // The send() method of a ClientProxy returns an Observable, not a Promise.
  public createUser(userDto: CreateUserDto) {
    return this.usersClient.send(USERS_PATTERNS.CREATE_USER, userDto);
  }

  public getUsers() {
    return this.usersClient.send(USERS_PATTERNS.GET_USERS, {});
  }

  public getUserById(userId: number) {
    return this.usersClient.send(USERS_PATTERNS.GET_USER_BY_ID, { userId });
  }

  public deleteUserById(userId: number) {
    return this.usersClient.send(USERS_PATTERNS.DELETE_USER_BY_ID, { userId });
  }
}
