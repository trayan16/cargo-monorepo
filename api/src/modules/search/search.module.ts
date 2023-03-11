import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Vehicle, VehicleSchema } from '../vehicle/vehicle.schema';
import { SearchVehicleController } from './search.controller';
import { SearchVehicleService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    AuthModule,
  ],
  controllers: [SearchVehicleController],
  providers: [SearchVehicleService],
})
export class SearchVehicleModule {}
