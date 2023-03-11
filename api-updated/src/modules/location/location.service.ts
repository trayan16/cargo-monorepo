import { GetLocationModel } from './models/getLocation.model';
import { Auction, AuctionDocument } from './../auction/auction.schema';
import { LocationModel } from './models/location.model';
import { LocationDto } from './dto/location.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
    @InjectModel(Auction.name)
    private readonly auctionModel: Model<AuctionDocument>,
  ) {}

  async create(location: LocationDto): Promise<LocationModel> {
    const createdLocation = await new this.locationModel(location);
    await createdLocation.save();
    return new LocationModel(createdLocation);
  }

  async findById(id: string): Promise<GetLocationModel> {
    const location = await this.locationModel.findById(id).exec();

    const auction = await this.auctionModel.findById(location.auctionId).exec();
    return new GetLocationModel(location, auction);
  }

  async findAll(): Promise<GetLocationModel[]> {
    const locations: LocationDocument[] = await this.locationModel
      .find()
      .exec();
    const locationsWithAuctions: GetLocationModel[] = [];
    for (const location of locations) {
      const auction = await this.auctionModel
        .findById(location.auctionId)
        .exec();
      locationsWithAuctions.push(new GetLocationModel(location, auction));
    }
    return locationsWithAuctions;
  }

  async update(id: string, location: Location): Promise<Location> {
    return this.locationModel
      .findByIdAndUpdate(id, location, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Location> {
    return this.locationModel.findByIdAndDelete(id).exec();
  }
}
