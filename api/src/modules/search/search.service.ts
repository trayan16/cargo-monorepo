import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mapVehicles } from '../vehicle/models/getVehicle.model';
import { Vehicle, VehicleDocument } from '../vehicle/vehicle.schema';

@Injectable()
export class SearchVehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async searchByVin(vin: string) {
    let searchStr: string;
    let vehicles: VehicleDocument[];
    const notLoggedUser = await this.request['user'];
    // const vinSearch = { $regex: new RegExp(`${searchStr}`, 'i') };

    if (vin.length === 6)
      searchStr = '^[A-HJ-NPR-Za-hj-npr-z\\d]{11}' + vin + '$';

    if (vin.length === 17) searchStr = `^${vin}`;

    if (!notLoggedUser) {
      console.log('NO AUTH');
      vehicles = await this.vehicleModel
        .find({
          vin: { $regex: `${searchStr}`, $options: 'i' },
        })
        .select('vin')
        .select('status')
        .select('stockNumber')
        .select('destination')
        .select('auction')
        .select('auctionLocation')
        .select('loadingTerminal')
        .select('description')
        .select('keys')
        .limit(5)
        .exec();
      return vehicles;
    } else {
      console.log('AUTH');
      vehicles = await this.vehicleModel
        .find({
          vin: { $regex: `${searchStr}`, $options: 'i' },
          userId: this.request['user']._id,
        })
        .limit(5)
        .exec();
      return await mapVehicles(vehicles);
    }
  }
}
