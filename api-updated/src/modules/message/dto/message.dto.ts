import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MessageType } from '../message.schema';

export class CreateMessageDto {
  @IsEnum(MessageType)
  type: MessageType;

  @IsNotEmpty()
  @IsString()
  old_status: string;

  @IsNotEmpty()
  @IsString()
  new_status: string;
}
