import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticationService } from "./authentication.service";
import { User } from "src/users/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email'
    })
  };
  async validate(email: string, password: string) {
    
  };
};
