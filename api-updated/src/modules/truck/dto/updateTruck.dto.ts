import { PartialType } from '@nestjs/mapped-types';
import { CreateTruckDto } from './createTruck.dto';

export class UpdateTruckDto extends PartialType(CreateTruckDto) {}
