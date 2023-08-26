/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Posts', schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
