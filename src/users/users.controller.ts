import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
  async getByEmail(@Body() dto: any) {
    return await this.usersService.getByEmail(dto);
  };

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.usersService.getById(id);
  };

};