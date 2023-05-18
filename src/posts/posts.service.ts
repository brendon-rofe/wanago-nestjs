import { Injectable } from "@nestjs/common";
import { Post } from "./post.interface";
import { CreatePostDto } from "./dto/createPost.dto";

@Injectable()
export class PostsService {
  
  private nextPostId = 1;
  private posts: Post[] = [];

  create(dto: CreatePostDto) {
    const newPost: Post = {
      id: this.nextPostId,
      title: dto.title,
      content: dto.content
    };
    this.posts.push(newPost);
    this.nextPostId++;
    return { message: 'New post created', post: newPost };
  };

  getAll(): Post[] {
    return this.posts;
  };

  getById(id: number) {
    const post = this.posts.find(p => p.id === id);
    return post;
  };

};