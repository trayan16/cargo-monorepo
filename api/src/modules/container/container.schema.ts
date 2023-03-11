import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ContainerDocument = Container & Document;

export enum ContainerStatus {
  LOADED = 'LOADED',
  DELIVERED = 'DELIVERED',
}

@Schema({ versionKey: false })
export class Container {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShippingLine' })
  shippingLineId: string;

  @Prop({ enum: ContainerStatus, required: true })
  status: ContainerStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vechicle' }] })
  vehicleIds: string[];

  @Prop()
  expectedDate: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }] })
  documentIds: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
