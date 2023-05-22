import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import PostgresErrorCode from "src/database/postgresErrorCode.enum";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {};

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);
    try {
      return await this.userService.create({ ...dto, password: password });
    } catch (error) {
      if(error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      };
    };
  };

  async login(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if(dto.password !== user.password) {
      throw new HttpException("Incorrect password porvided", HttpStatus.BAD_REQUEST);
    };
    user.password = undefined;
    return user;
  };

};