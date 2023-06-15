import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  };

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.postsService.getById(parseInt(id));
  };
};
