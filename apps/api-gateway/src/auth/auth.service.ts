import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_CLIENT, AUTH_PATTERNS } from '@app/contracts';
import { lastValueFrom } from 'rxjs';
import { ExistingUserDto } from '../common/dto/existing-user.dto';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { throwHttpExceptionFromRpc } from '@app/common';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  public async signup(createUser: CreateUserDto) {
    try {
      // send(pattern, message) patern must be same as define in the auth microservices i.e. auth's controller
      return await lastValueFrom(
        this.authClient.send(AUTH_PATTERNS.SIGNUP, createUser),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  public async login(existingUserDto: ExistingUserDto) {
    try {
      return await lastValueFrom(
        // convert in promise
        this.authClient.send(AUTH_PATTERNS.LOGIN, existingUserDto),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }
}
