import { Injectable } from '@nestjs/common';
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
    return await this.postRepo.findOneBy({ id });
  };

  async update(id: number, dto: UpdatePostDto) {
    await this.postRepo.update(id, dto);
    return await this.getById(id);
  };

  async delete(id: number) {
    await this.postRepo.delete({ id });
    return { message: `Post with ID: ${id} successfully deleted` };
  };
};
