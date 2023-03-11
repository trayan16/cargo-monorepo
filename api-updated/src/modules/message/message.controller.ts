import { MessageModel } from './models/message.model';
import { CreateMessageDto as MessageDto } from './dto/message.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Message } from './message.schema';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() message: MessageDto): Promise<MessageModel> {
    return this.messageService.create(message);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<MessageModel> {
    return this.messageService.findById(id);
  }

  @Get()
  async findAll(): Promise<MessageModel[]> {
    return this.messageService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() message: MessageDto,
  ): Promise<MessageModel> {
    return this.messageService.update(id, message);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Message> {
    return this.messageService.delete(id);
  }
}
