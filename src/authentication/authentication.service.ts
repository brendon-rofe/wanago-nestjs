import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {};

  async register(dto: RegisterDto) {
    return await this.userService.create(dto);
  };

};