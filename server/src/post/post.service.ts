/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';

import { v4 as uuidv4 } from 'uuid';
import { Mode } from 'fs';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    try {
      const post = new this.postModel(createPostDto);
      return await post.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<Posts> {
    try {
      const post = await this.postModel
        .findOne({ _id: id })
        .populate('authorId', 'userName displayName avatar', this.profileModel)
        .exec();
      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postModel.findOneAndUpdate(
        { id: id },
        { ...updatePostDto },
        { new: true },
      );
      return updatedPost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletePost = await this.postModel.findOneAndDelete({ id: id });
      return deletePost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByAuthorId(authorId: string) {
    try {
      const posts = await this.postModel.find({ authorId: authorId }).exec();
      return posts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByTags(tags: string[]) {
    try {
      const posts = await this.postModel.find({ tags: { $in: tags } }).exec();
      return posts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllAndSort(
    page: number,
    limit: number,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<Posts[]> {
    const sortOptions = { [sortBy]: sortOrder };
    const skip = page * limit;
    const posts = await this.postModel
      .find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
    return posts;
  }

  async like(id: string, profileId: string): Promise<Posts> {
    try {
      const post = await this.postModel.findOneAndUpdate(
        { id: id },
        {
          $addToSet: { likes: profileId },
        },
        { new: true },
      );

      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async unlike(id: string, profileId: string): Promise<Posts> {
    try {
      const post = await this.postModel.findOneAndUpdate(
        { id: id },
        {
          $pull: { likes: profileId },
        },
        { new: true },
      );

      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async share(id: string, profileId: string): Promise<Posts> {
    try {
      const post = await this.postModel.findOneAndUpdate(
        { id: id },
        {
          $addToSet: { shares: profileId },
        },
        { new: true },
      );

      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
