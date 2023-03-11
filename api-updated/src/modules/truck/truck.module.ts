import {
  TruckCompany,
  TruckCompanySchema,
} from './../truckCompany/truckCompany.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TruckController } from './truck.controller';
import { Truck, TruckSchema } from './truck.schema';
import { TruckService } from './truck.service';
import { Vehicle, VehicleSchema } from '../vehicle/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Truck.name, schema: TruckSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: TruckCompany.name, schema: TruckCompanySchema },
    ]),
  ],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule {}
