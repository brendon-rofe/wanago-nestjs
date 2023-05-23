import { HttpException, HttpStatus, Injectable, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { JwtAuthenticationGuard } from "src/authentication/jwt-authentication.guard";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) {}

  @UseGuards(JwtAuthenticationGuard)
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
    };
    return post;
  };

  @UseGuards(JwtAuthenticationGuard)
  async updatePost(id: number, updatedPost: CreatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    await this.postsRepository.update(id, updatedPost);
    return { message: `Post with ID: ${id} updated` };
  };

  @UseGuards(JwtAuthenticationGuard)
  async removePost(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    await this.postsRepository.delete(id);
    return { message: `Post with ID: ${id} deleted` };
  };

};