import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT, USERS_PATTERNS } from '@app/contracts';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
  ) {}

  // The send() method of a ClientProxy returns an Observable, not a Promise.
  public async createUser(userDto: CreateUserDto) {
    return await lastValueFrom(
      this.usersClient.send(USERS_PATTERNS.CREATE_USER, userDto),
    );
  }

  public async getUsers() {
    return await lastValueFrom(
      this.usersClient.send(USERS_PATTERNS.GET_USERS, {}),
    );
  }

  public async getUserById(userId: number) {
    return await lastValueFrom(
      this.usersClient.send(USERS_PATTERNS.GET_USER_BY_ID, { userId }),
    );
  }

  public async deleteUserById(userId: number) {
    return await lastValueFrom(
      this.usersClient.send(USERS_PATTERNS.DELETE_USER_BY_ID, { userId }),
    );
  }
}
