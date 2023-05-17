import { Injectable } from "@nestjs/common";
import { Post } from "./post.interface";
import { CreatePostDto } from "./dto/createPost.dto";

@Injectable()
export class PostsService {
  
  private nextPostId = 1;
  private posts: Post[] = [];

  createPost(dto: CreatePostDto) {
    const newPost: Post = {
      id: this.nextPostId,
      title: dto.title,
      content: dto.content
    };
    this.posts.push(newPost);
    return { message: 'New post created', post: newPost };
  };

};