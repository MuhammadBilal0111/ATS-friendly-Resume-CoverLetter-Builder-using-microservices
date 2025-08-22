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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: JwtRequest) => {
          return request.jwt; // custom extractor (used for RPC)
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: authConfiguration.secret as string,
    });
  }

  public async validate(payload: any) {
    // payload is the decoded JWT (id, email, roles, etc.
    return payload;
  }
}
