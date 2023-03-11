import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

export enum VehicleStatus {
  TRANSIT = 'TRANSIT',
  LOADED = 'LOADED',
  AT_TERMINAL = 'AT_TERMINAL',
  UNLOADED = 'UNLOADED',
  LOADED_ON_THE_TRUCK = 'LOADED_ON_THE_TRUCK',
  FINAL_DESTINATION = 'FINAL_DESTINATION',
}

@Schema({ versionKey: false })
export class Vehicle {
  @Prop({ required: true })
  vin: string;

  @Prop({ enum: VehicleStatus, required: true })
  status: VehicleStatus;

  @Prop({ required: true })
  stockNumber: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
  })
  auctionId: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  })
  auctionLocationId: string;

  @Prop({ required: true })
  keys: boolean;

  @Exclude({ toPlainOnly: true })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: false })
  expectedDate: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container',
  })
  containerId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Terminal',
  })
  loadingTerminalId: string;

  @Prop()
  shipperLink: string;

  @Prop()
  images: string[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' } })
  truckId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doc' }] })
  documentIds: string[];

  @Prop()
  notes: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
