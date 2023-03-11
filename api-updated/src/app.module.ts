import { TerminalModule } from './modules/terminal/terminal.module';
import { UserModule } from './modules/user/user.module';
import { TruckCompanyModule } from './modules/truckCompany/truckCompany.module';
import { ShippingLineModule } from './modules/shippingLine/shippingLine.module';
import { MessageModule } from './modules/message/message.module';
import { DocumentsModule } from './modules/document/document.module';
import { ContainerModule } from './modules/container/container.module';
import { AuctionModule } from './modules/auction/auction.module';
import { TruckModule } from './modules/truck/truck.module';
import { configValidationSchema } from './config/config.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './modules/location/location.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { LoggerModule } from 'nestjs-pino';
import mongodbConfig from './config/config.mongo';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SearchVehicleModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        ...configService.get<any>('mongodb.options'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({}),
    TruckModule,
    AuctionModule,
    ContainerModule,
    DocumentsModule,
    LocationModule,
    MessageModule,
    ShippingLineModule,
    TruckCompanyModule,
    UserModule,
    VehicleModule,
    LocationModule,
    TerminalModule,
    SearchVehicleModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
