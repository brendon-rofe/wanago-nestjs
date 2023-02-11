import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import PostsService from "./posts.service";

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto ) {
    return this.postsService.updatePost(Number(id), post);
  }

}