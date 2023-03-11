import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShippingLineDocument = ShippingLine & Document;

@Schema({ versionKey: false })
export class ShippingLine {
  @Prop({ required: true })
  name: string;

  @Prop()
  trackUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const ShippingLineSchema = SchemaFactory.createForClass(ShippingLine);
