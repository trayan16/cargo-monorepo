import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShippingLineDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly trackUrl: string;
}
