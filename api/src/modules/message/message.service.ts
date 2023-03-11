import { MessageModel } from './models/message.model';
import { CreateMessageDto as MessageDto } from './dto/message.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(message: MessageDto): Promise<MessageModel> {
    const createdMessage = await new this.messageModel(message);
    await createdMessage.save();
    return new MessageModel(createdMessage);
  }

  async findById(id: string): Promise<MessageModel> {
    const message = await this.messageModel.findById(id).exec();
    return new MessageModel(message);
  }

  async findAll(): Promise<MessageModel[]> {
    const foundMessage = await this.messageModel.find().exec();
    const allMessages: MessageModel[] = foundMessage.map((message) => {
      return new MessageModel(message);
    });
    return allMessages;
  }

  async update(id: string, message: MessageDto): Promise<MessageModel> {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, message, { new: true })
      .exec();
    return new MessageModel(updatedMessage);
  }

  async delete(id: string): Promise<Message> {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
