import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  // read password from buffer
  // Abstract method means (method with no implementation) you donot have to provide the actual implementation the inherited class will provide the actual implementation
  abstract hashPassword(data: string | Buffer): Promise<string>;
  abstract comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean>;
}

// abstract class can be inherited but cannot instantiated diectly
// to support the abstract class we will have to create another class which will inherited the hashing provider

// any class going to inherit from this hashingProvider class that class will have to provide the concrete implements for these abstract methods
