import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.usersService.create(userData);
  };

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  };

  @Get('email')
  async getByEmail(@Body() email: string) {
    return await this.usersService.getByEmail(email);
  };

};