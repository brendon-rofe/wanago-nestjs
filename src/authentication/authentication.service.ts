import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import PostgresErrorCode from "src/database/postgresErrorCode.enum";

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {};

  async register(dto: RegisterDto) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      if(error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      };
    };
  };

};