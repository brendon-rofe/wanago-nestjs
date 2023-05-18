import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostsService } from "./posts.service";
import { UpdatePostDto } from "./dto/updatePost.dto";

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

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postsService.getById(Number(id));
  };

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatedPost: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), updatedPost);
  };

};