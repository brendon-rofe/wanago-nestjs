import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return { message: 'New user created', user: newUser };
  };

  async getAll() {
    return await this.userRepository.find();
  };

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if(!user){
      throw new HttpException(`User with email: ${email} not found`, HttpStatus.NOT_FOUND);
    };
    return user;
  };

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if(!user){
      throw new HttpException(`User with id: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    return user;
  };

};