/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { TagService } from 'src/tag/tag.service';

@Controller('v1/post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const requiredFields = ['id', 'authorId', 'content'];
    const missingFields = requiredFields.filter(
      (field) => !createPostDto[field],
    );
    if (missingFields.length > 0) {
      throw new HttpException(
        `Missing required fields: ${missingFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newPost = await this.postService.create(createPostDto);
      return newPost;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findOne(@Query('id') id: string) {
    try {
      const post = await this.postService.findOne(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  @Put()
  async update(@Query('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postService.update(id, updatePostDto);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async remove(@Query('id') id: string) {
    try {
      const deletedPost = await this.postService.remove(id);
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }

  @Get('author')
  async findByAuthorId(@Query('id') authorId: string) {
    try {
      const posts = await this.postService.findByAuthorId(authorId);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Get('tags')
  async findByTags(@Query('id') tags: string[]) {
    try {
      const posts = await this.postService.findByTags(tags);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async findAllAndSort(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<Posts[]> {
    try {
      const posts = await this.postService.findAllAndSort(
        page,
        limit,
        sortBy,
        sortOrder,
      );
      if (posts.length === 0) {
        return [];
      }
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Put('like')
  async likePost(
    @Query('id') id: string,
    @Body('profileId') profileId: string,
  ) {
    try {
      const post = await this.postService.findOne(id);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
      }

      const updatedPost = await this.postService.like(id, profileId);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Put('unlike')
  async unlikePost(
    @Query('id') id: string,
    @Body('profileId') profileId: string,
  ) {
    try {
      const post = await this.postService.findOne(id);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
      }

      const updatedPost = await this.postService.unlike(id, profileId);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Put('share')
  async sharePost(
    @Query('id') id: string,
    @Body('profileId') profileId: string,
  ) {
    try {
      const post = await this.postService.findOne(id);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
      }

      const updatedPost = await this.postService.share(id, profileId);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
}
