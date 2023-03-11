import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TerminalDocument = Terminal & Document;

@Schema({ versionKey: false })
export class Terminal {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const TerminalSchema = SchemaFactory.createForClass(Terminal);
