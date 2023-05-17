import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PostsService],
})

export class PostsModule {}