import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum TruckStatus {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  LOADED = 'LOADED',
}

export type TruckDocument = Truck & Document;

@Schema({ versionKey: false })
export class Truck {
  @Prop({ required: false })
  plateNumber: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruckCompany' }],
    required: false,
  })
  truckCompanyId: string;

  @Prop({ required: false, enum: TruckStatus })
  status: TruckStatus;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vechicle' }],
    required: false,
  })
  vehicleIds: string[];

  @Prop({ required: false })
  expectedDate: Date;

  @Prop()
  notes: string;

  @Prop()
  cmr: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
