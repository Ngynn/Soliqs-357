import { HttpException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    try {
      const createdMessage = new this.messageModel(createMessageDto);
      return createdMessage.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByChatId(
    chatId: string,
    page: number,
    limit: number,
    sortOrder: string = 'createdAt',
  ): Promise<Message[]> {
    try {
      const skip = (page - 1) * limit;
      const messages = await this.messageModel
        .find({ chatId: chatId })
        .populate('sender', 'userName displayName avatar')
        .populate('recipient', 'userName displayName avatar')
        .sort({ [sortOrder]: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      return messages;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(_id: string): Promise<Message> {
    try {
      const deletedMessage = await this.messageModel
        .findByIdAndUpdate(_id, { isDeleted: true }, { new: true })
        .exec();
      return deletedMessage;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
