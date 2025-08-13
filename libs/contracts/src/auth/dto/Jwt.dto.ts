import { IsNotEmpty, IsString } from 'class-validator';

export class JwtDto {
  @IsNotEmpty()
  @IsString()
  jwt: string;
}
