import { Controller } from "@nestjs/common";
import PostsService from "./posts.service";

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}
}