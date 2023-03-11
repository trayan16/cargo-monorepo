import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuctionDocument = Auction & Document;

@Schema({ versionKey: false })
export class Auction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  trackingUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
