import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostService } from 'src/post/post.service';

@Controller('v1/comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Query('id') id: string,
  ) {
    try {
      const post = await this.postService.findOne(id);

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
      }
      const newComment = await this.commentService.create({
        ...createCommentDto,
        postId: post.id,
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findByPostId(@Query('postId') postId: string) {
    try {
      const comments = await this.commentService.findByPostId(postId);
      if (!comments) {
        return [];
      }
      return comments;
    } catch (error) {
      throw error;
    }
  }

  @Put()
  async update(
    @Query('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    try {
      const updatedComment = await this.commentService.update(
        id,
        updateCommentDto,
      );
      return updatedComment;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async delete(@Query('id') id: string) {
    try {
      const deletedComment = await this.commentService.delete(id);
      return deletedComment;
    } catch (error) {
      throw error;
    }
  }
}
