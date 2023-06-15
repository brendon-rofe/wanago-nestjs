import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  };
  
  @Get()
  async getAll() {
    return await this.postsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.postsService.getById(parseInt(id));
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return await this.postsService.update(parseInt(id), dto);
  };

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postsService.delete(parseInt(id));
  };
};
