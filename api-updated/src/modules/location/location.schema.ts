import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ versionKey: false })
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' })
  auctionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
