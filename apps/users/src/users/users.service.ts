import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import {
  CreateUserDto,
  DeleteUserByIdDto,
  GetUserByEmail,
  GetUserByIdDto,
} from '@app/contracts';
import { AppRpcException, HashingProvider } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      const existingUserWithUserName = await this.userRepository.findOne({
        where: {
          username: userDto.username,
        },
      });

      if (existingUserWithUserName) {
        throw new AppRpcException(
          `Username '${userDto.username}' is already taken.`,
          HttpStatus.CONFLICT,
        );
      }
      const existingUserWithEmail = await this.userRepository.findOne({
        where: {
          email: userDto.email,
        },
      });

      if (existingUserWithEmail) {
        throw new AppRpcException(
          `Email '${userDto.email}' is already registered.`,
          HttpStatus.CONFLICT,
        );
      }
      // create User Object that map with users entity
      let user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
      });

      // Save User object
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof AppRpcException) throw error;

      throw new AppRpcException(
        'User creation failed due to an unexpected issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  public async findUserById(getUserByIdDto: GetUserByIdDto): Promise<User> {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOneBy({
        id: getUserByIdDto.userId,
      });
    } catch (error) {
      throw new AppRpcException(
        'Failed to fetch user by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
    if (!user) {
      throw new AppRpcException(
        `User with ID ${getUserByIdDto.userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async deleteUserById(deleteUserByIdDto: DeleteUserByIdDto): Promise<{
    deleted: boolean;
    userId: number;
    message: string;
  }> {
    try {
      const result = await this.userRepository.delete(deleteUserByIdDto.userId);
      if (result.affected === 0) {
        // if not found
        throw new AppRpcException(
          `User with ID ${deleteUserByIdDto.userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        deleted: true,
        userId: deleteUserByIdDto.userId,
        message: 'User deleted successfully',
      };
    } catch (error) {
      if (error instanceof AppRpcException) throw error;

      throw new AppRpcException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        // exclude password
        select: [
          'id',
          'username',
          'email',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      });
    } catch (error) {
      throw new AppRpcException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  public async findUserByEmail(getUserByEmail: GetUserByEmail) {
    let user: User | null = null;
    const { email } = getUserByEmail;
    try {
      user = await this.userRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new AppRpcException(
        'User with given email could not be found',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
    return user;
  }
}
