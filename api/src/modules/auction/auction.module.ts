import { AuctionService } from './auction.service';
import { AuctionsController } from './auction.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './auction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
  exports: [MongooseModule],
  controllers: [AuctionsController],
  providers: [AuctionService],
})
export class AuctionModule {}
