import { Injectable } from "@nestjs/common";
import { Post } from "./post.interface";

@Injectable()
export class PostsService {
  
  private nextPostId = 1;
  private posts: Post[] = [];

};