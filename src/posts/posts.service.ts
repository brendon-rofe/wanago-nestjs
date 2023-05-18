import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) {}

  async create(dto: CreatePostDto) {
    const newPost = await this.postsRepository.create(dto);
    await this.postsRepository.save(newPost);
    return { message: 'New post created', post: newPost };
  };

  async getAll() {
    return await this.postsRepository.find();
  };

  getById(id: number) {
    return null;
  };

  updatePost(id: number, updatedPost: CreatePostDto) {
    return { message: `Post with ID: ${id} updated` };
  };

  removePost(id: number) {
    return { message: `Post with ID: ${id} removed` };
  };

};