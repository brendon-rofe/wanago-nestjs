import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import Post from "./post.entity";

@Injectable()
export default class PostsService {
  constructor(private postsRepository: Repository<Post>) {}
}