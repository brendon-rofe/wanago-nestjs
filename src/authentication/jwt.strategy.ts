import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
          return request?.cookies?.Authentication;
        }]),
        secretOrKey: process.env.JWT_SECRET
    });
  };

  async validate(payload: TokenPayload) {
    return this.usersService.getById(payload.userId);
  };
}