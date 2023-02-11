import { Body, Controller, Post } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import PostsService from "./posts.service";

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

}