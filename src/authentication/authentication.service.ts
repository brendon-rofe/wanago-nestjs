import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import PostgresErrorCode from "src/database/postgresErrorCode.enum";
import { TokenPayload } from "./tokenPayload.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {};

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

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION}`;
  };

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  };

  public async getAuthenticatedUser(email: string, plaintextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plaintextPassword, user.password);
      return user;
    } catch(error) {
      throw new HttpException("Wrong credential provided", HttpStatus.BAD_REQUEST);
    };
  };

  private async verifyPassword(plaintextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plaintextPassword, hashedPassword);
    if(!isPasswordMatching) {
      throw new HttpException("Wrong credential provided", HttpStatus.BAD_REQUEST);
    }
  };

};