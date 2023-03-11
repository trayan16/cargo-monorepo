import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRoles {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ enum: UserRoles, required: true })
  role: UserRoles;

  @Exclude({ toPlainOnly: true })
  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, updatedAt: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
