import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {};

  async create(dto: CreateUserDto) {
    const newUser = this.userRepo.create(dto);
    await this.userRepo.save(newUser);
    return newUser
  };
};
