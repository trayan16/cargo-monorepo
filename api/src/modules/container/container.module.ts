import { ShippingLineSchema } from './../shippingLine/shippingLine.schema';
import { Container, ContainerSchema } from './container.schema';
import { Module } from '@nestjs/common';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from '../vehicle/vehicle.schema';
import { ShippingLine } from '../shippingLine/shippingLine.schema';
import { Doc, DocSchema } from '../document/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Container.name, schema: ContainerSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: ShippingLine.name, schema: ShippingLineSchema },
      { name: Doc.name, schema: DocSchema },
    ]),
  ],
  controllers: [ContainerController],
  providers: [ContainerService],
})
export class ContainerModule {}
