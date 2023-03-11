import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocDocument = Doc & Document;

@Schema({ versionKey: false })
export class Doc {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
