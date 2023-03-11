import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTruckCompanyDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly trackUrl: string;
}
