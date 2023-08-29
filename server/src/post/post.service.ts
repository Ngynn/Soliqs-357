/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './entities/post.entity';
@Injectable()
export class PostService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>){}
  create(createPostDto: CreatePostDto) {
    return new this.postModel(createPostDto).save();
  }


  async findOne(id: string): Promise<Posts> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    return await this.postModel
    .findByIdAndUpdate(id, updatePostDto, {
      new: true,
    })
    .exec();
  }

  async remove(id: string): Promise<Posts> {
    return await this.postModel.findByIdAndDelete(id).exec();
  }

  async findByAuthorId(authorId: string): Promise<Posts[]> {
    try {
      const posts = await this.postModel.find({authorId: authorId}).exec();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async findByTags(tags: string[]): Promise<Posts[]> {
    try {
      const posts = await this.postModel.find({tags: {$in: tags}}).exec();
      return posts;
    } catch (error) {
      throw error;
    }
  }

}
