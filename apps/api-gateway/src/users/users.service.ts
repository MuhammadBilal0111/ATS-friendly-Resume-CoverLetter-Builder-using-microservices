import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT, USERS_PATTERNS } from '@app/contracts';
import { lastValueFrom } from 'rxjs';
import { throwHttpExceptionFromRpc } from '@app/common'; // Reusable error handler
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
  ) {}

  // The send() method of a ClientProxy returns an Observable, not a Promise.
  // So if you're writing async/await style code (which is Promise-based), you need to convert the Observable to a Promise using .toPromise()
  public async createUser(userDto: CreateUserDto) {
    try {
      return await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.CREATE_USER, userDto),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  public async getUsers() {
    try {
      return await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.GET_USERS, {}),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  public async getUserById(userId: number) {
    try {
      return await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.GET_USER_BY_ID, { userId }),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  public async deleteUserById(userId: number) {
    try {
      return await lastValueFrom(
        this.usersClient.send(USERS_PATTERNS.DELETE_USER_BY_ID, { userId }),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }
}
