import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import PostgresErrorCode from "src/database/postgresErrorCode.enum";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {};

  async register(registerDto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(registerDto.password, salt);
    try {
      return await this.userService.create({ ...registerDto, password: password });
    } catch (error) {
      if(error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      };
    };
  };

  async login(loginDto: LoginDto) {
    const user = await this.userService.getByEmail(loginDto.email);
    const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
    if(isPasswordMatching) {
      user.password = undefined;
      return user;
    };
    throw new HttpException("Incorrect password provided", HttpStatus.BAD_REQUEST);
  };

};