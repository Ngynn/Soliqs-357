import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    try {
      const createdMessage = this.messageService.create(createMessageDto);
      return createdMessage;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findByChatId(
    @Query('chatId') chatId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortOrder') sortOrder = 'createdAt',
  ) {
    try {
      const messages = this.messageService.findByChatId(
        chatId,
        page,
        limit,
        sortOrder,
      );

      return messages;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  remove(@Query('_id') _id: string) {
    try {
      const deletedMessage = this.messageService.remove(_id);
      return deletedMessage;
    } catch (error) {
      throw error;
    }
  }
}
