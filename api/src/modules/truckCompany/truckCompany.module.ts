import { TruckCompany, TruckCompanySchema } from './truckCompany.schema';
import { Module } from '@nestjs/common';
import { TruckCompanyController } from './truckCompany.controller';
import { TruckCompanyService } from './truckCompany.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TruckCompany.name, schema: TruckCompanySchema },
    ]),
  ],
  controllers: [TruckCompanyController],
  providers: [TruckCompanyService],
})
export class TruckCompanyModule {}
