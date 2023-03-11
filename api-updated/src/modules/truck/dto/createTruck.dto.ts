import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  IsDateString,
  IsMongoId,
} from 'class-validator';
import { TruckStatus } from '../truck.schema';

export class CreateTruckDto {
  @IsOptional()
  @IsString()
  plateNumber?: string;

  @IsOptional()
  @IsMongoId()
  truckCompanyId?: string;

  @IsOptional()
  @IsEnum(TruckStatus)
  status?: TruckStatus;

  @IsArray()
  @IsString({ each: true })
  vehicleIds: string[];

  @IsOptional()
  @IsDateString()
  expectedDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  cmr?: string;
}
