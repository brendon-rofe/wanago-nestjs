import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.usersService.create(userData);
  };

};