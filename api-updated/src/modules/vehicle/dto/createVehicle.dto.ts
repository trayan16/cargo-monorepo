import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsMongoId,
  IsDateString,
} from 'class-validator';
import { VehicleStatus } from '../vehicle.schema';

export class CreateVehicleDto {
  @IsString()
  vin: string;

  @IsEnum(VehicleStatus)
  status: VehicleStatus;

  @IsString()
  stockNumber: string;

  @IsString()
  @IsMongoId()
  auctionId: string;

  @IsString()
  description: string;

  @IsString()
  @IsMongoId()
  auctionLocationId: string;

  @IsBoolean()
  keys: boolean;

  @IsString()
  @IsMongoId()
  userId: string;

  @IsString()
  destination: string;

  @IsString()
  @IsDateString()
  expectedDate: Date;

  @IsString()
  @IsMongoId()
  containerId: string;

  @IsString()
  @IsMongoId()
  loadingTerminalId: string;

  @IsString()
  shipperLink: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  @IsString()
  @IsMongoId()
  truckId?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsString({ each: true })
  documentIds?: string[];

  @IsOptional()
  notes?: string;
}
