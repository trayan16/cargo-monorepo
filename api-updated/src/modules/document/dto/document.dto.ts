import { IsString } from 'class-validator';

export class DocumentDto {
  @IsString()
  name: string;

  @IsString()
  path: string;
}
