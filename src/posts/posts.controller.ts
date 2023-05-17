import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
  
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  };

  @Get()
  getAll() {
    return this.postsService.getAll();
  };

};