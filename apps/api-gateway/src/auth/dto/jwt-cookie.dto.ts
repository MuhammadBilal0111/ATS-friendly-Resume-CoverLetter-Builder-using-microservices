import { IsNotEmpty, IsString } from 'class-validator';
import { BaseTokenDto } from './base-token.dto';

export class JwtCookieDto extends BaseTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
