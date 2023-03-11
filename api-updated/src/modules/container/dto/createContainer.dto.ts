import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  IsDateString,
} from 'class-validator';

enum ContainerStatus {
  LOADED = 'LOADED',
  DELIVERED = 'DELIVERED',
}

export class CreateContainerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(ContainerStatus)
  status: ContainerStatus;

  @IsOptional()
  @IsString()
  shippingLineId: string;

  @IsOptional()
  @IsArray()
  vehicleIds: string[];

  @IsOptional()
  @IsArray()
  documentIds: string[];

  @IsOptional()
  @IsDateString()
  expectedDate: string;
}
