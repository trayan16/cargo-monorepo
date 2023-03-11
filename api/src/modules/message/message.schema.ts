import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

export enum MessageType {
  TRUCK = 'TRUCK',
  VEHICLE = 'VEHICLE',
  CONTAINER = 'CONTAINER',
}

@Schema({ versionKey: false })
export class Message {
  @Prop({ enum: MessageType })
  type: MessageType;

  @Prop({ required: true })
  old_status: string;

  @Prop({ required: true })
  new_status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
