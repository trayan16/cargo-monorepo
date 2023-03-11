import { AuctionModel } from './models/Auction.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction, AuctionDocument } from './auction.schema';
import { AuctionDto } from './dto/auction.dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>,
  ) {}

  async create(auction: AuctionDto): Promise<AuctionModel> {
    const createdAuction = await new this.auctionModel(auction);
    await createdAuction.save();
    return new AuctionModel(createdAuction);
  }

  async findAll(): Promise<AuctionModel[]> {
    const foundAuctions = await this.auctionModel.find().exec();
    const allAuctions: AuctionModel[] = foundAuctions.map((auction) => {
      return new AuctionModel(auction);
    });
    return allAuctions;
  }

  async findOne(id: string): Promise<AuctionModel> {
    const foundAuction = await this.auctionModel.findById(id).exec();
    return new AuctionModel(foundAuction);
  }

  async update(id: string, auction: AuctionDto): Promise<AuctionModel> {
    const auctionToUpdate = await this.auctionModel
      .findByIdAndUpdate(id, auction, { new: true })
      .exec();
    return new AuctionModel(auctionToUpdate);
  }

  async delete(id: string): Promise<void> {
    await this.auctionModel.findByIdAndDelete(id).exec();
  }
}
