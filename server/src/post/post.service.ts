/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>){}
  create(createPostDto: CreatePostDto) {
    return new this.postModel(createPostDto).save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.postModel
    .findByIdAndUpdate(id, updatePostDto, {
      new: true,
    })
    .exec();
  }

  async remove(id: string): Promise<Post> {
    return await this.postModel.findByIdAndDelete(id).exec();
  }

}
