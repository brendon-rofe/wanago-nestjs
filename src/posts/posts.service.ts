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

  async getById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id: id });
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return post;
  };

  updatePost(id: number, updatedPost: CreatePostDto) {
    return { message: `Post with ID: ${id} updated` };
  };

  removePost(id: number) {
    return { message: `Post with ID: ${id} removed` };
  };

};