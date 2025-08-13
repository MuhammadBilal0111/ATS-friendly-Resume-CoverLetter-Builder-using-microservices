import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { JwtRequest } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {
    super({
      // Configurations
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: JwtRequest) => {
          console.log('request', request?.jwt);
          return request?.jwt;
        },
      ]),
      ignoreExpiration: false, // When set to false, Passport automatically denies access if the JWT has expired, so no additional code is needed for expiration handling.
      secretOrKey: authConfiguration.secret as string,
    });
  }

  public async validate(payload: any) {
    console.log(payload);
    return payload;
  }
}
