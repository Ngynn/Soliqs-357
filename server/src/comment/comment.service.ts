import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const createdComment = new this.commentModel(createCommentDto);
      return createdComment.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const updatedComment = await this.commentModel
        .findByIdAndUpdate(id, { ...updateCommentDto }, { new: true })
        .exec();
      return updatedComment;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: string): Promise<Comment> {
    try {
      const deletedComment = await this.commentModel.findByIdAndDelete(id);
      return deletedComment;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
