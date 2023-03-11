import { CreateTruckDto } from './../../truck/dto/createTruck.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTruckCompanyDto extends PartialType(CreateTruckDto) {}
