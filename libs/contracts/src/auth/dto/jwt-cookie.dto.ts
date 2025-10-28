import { IsNotEmpty, IsString } from 'class-validator';

export class JwtCookieDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
