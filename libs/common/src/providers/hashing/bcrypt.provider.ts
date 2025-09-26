import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    // 1. Generate salt
    let salt = await bcrypt.genSalt();
    // 2. hash password
    return await bcrypt.hash(password, salt);
  }
  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword); // compare first convert plain password to hashpassword and then campare
  }
}
