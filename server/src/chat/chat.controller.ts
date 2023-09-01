import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    try {
      const createdChat = this.chatService.create(createChatDto);
      return createdChat;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      const chats = this.chatService.findAll();
      return chats;
    } catch (error) {
      throw error;
    }
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    try {
      const chat = this.chatService.findOne(id);
      return chat;
    } catch (error) {
      throw error;
    }
  }

  @Put()
  update(@Query('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    try {
      const updatedChat = this.chatService.update(id, updateChatDto);
      return updatedChat;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  remove(@Query('id') id: string) {
    try {
      const deletedChat = this.chatService.remove(id);
      return deletedChat;
    } catch (error) {
      throw error;
    }
  }
}
