import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/createUser.dto";
import FindByEmail from "./dto/findByEmail.dto";
import User from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(dto: FindByEmail) {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email
      }
    });
    if(user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if(user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

}