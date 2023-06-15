import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepo: Repository<PostEntity> ) {};

  async create(post: CreatePostDto) {
    const newPost = this.postRepo.create(post);
    await this.postRepo.save(newPost);
    return newPost;
  };

  async getAll() {
    return await this.postRepo.find();
  };

  async getById(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND)
    };
    return post;
  };

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.getById(id);
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND)
    };
    await this.postRepo.update(id, dto);
    return await this.getById(id);
  };

  async delete(id: number) {
    const post = await this.getById(id);
    if(!post) {
      throw new HttpException(`Post with ID: ${id} not found`, HttpStatus.NOT_FOUND)
    };
    await this.postRepo.delete({ id });
    return { message: `Post with ID: ${id} successfully deleted` };
  };
};
