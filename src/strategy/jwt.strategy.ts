import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/modules/user/entity/users.entity';
import { MAIL_IS_NOT_ACTIVATED } from '../modules/auth/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt_access_secret_key")
    });
  }

  async validate(payload: Pick<Users, "id" | "name" | "email" | "isActivated">) {
    if (payload.isActivated) {
        return payload;
    } else {
        throw new UnauthorizedException(MAIL_IS_NOT_ACTIVATED)
    }
  }
}