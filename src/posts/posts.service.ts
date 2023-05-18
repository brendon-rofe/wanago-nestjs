import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    return post;
  };

  updatePost(id: number, updatedPost: CreatePostDto) {
    const post = this.posts.find(p => p.id === id);
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    const indexOfPost = this.posts.indexOf(post);
    const newPost: Post = {
      id: id,
      title: updatedPost.title,
      content: updatedPost.content
    };
    this.posts[indexOfPost] = newPost;
    return { message: `Post with ID: ${id} updated`, newPost };
  };

  removePost(id: number) {
    const post = this.posts.find(p => p.id === id);
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    this.posts.filter(p => p.id !== id);
    return { message: `Post with ID: ${id} removed` };
  };

};