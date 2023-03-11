import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TruckCompanyDocument = TruckCompany & Document;

@Schema({ versionKey: false })
export class TruckCompany {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  trackingUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const TruckCompanySchema = SchemaFactory.createForClass(TruckCompany);
