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

  private async verifyPassword(plaintextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plaintextPassword, hashedPassword);
    if(!isPasswordMatching) {
      throw new HttpException("Wrong credential provided", HttpStatus.BAD_REQUEST);
    }
  };

};