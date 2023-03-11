import {
  ShippingLine,
  ShippingLineSchema,
} from './../shippingLine/shippingLine.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingLineService } from './shippingLine.service';
import { ShippingLineController } from './shippingLine.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingLine.name, schema: ShippingLineSchema },
    ]),
  ],
  controllers: [ShippingLineController],
  providers: [ShippingLineService],
})
export class ShippingLineModule {}
