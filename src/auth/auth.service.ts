import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {};

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try{
      const newUser = await this.usersService.create({
        ...dto,
        hash: hashedPassword
      });
      newUser.hash = undefined;
      return newUser;
    } catch(error) {
      if(error.code === '23505') {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      };
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };
};
