import { IsNotEmpty, IsString } from 'class-validator';

export class BaseTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
