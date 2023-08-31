import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const createdChat = new this.chatModel(createChatDto);
      return createdChat.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const chats = await this.chatModel.find().exec();
      return chats;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const chat = await this.chatModel.findById(id).exec();
      return chat;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    try {
      const updatedChat = await this.chatModel
        .findByIdAndUpdate(id, { ...updateChatDto }, { new: true })
        .exec();
      return updatedChat;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedChat = await this.chatModel.findByIdAndDelete(id);
      return deletedChat;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
