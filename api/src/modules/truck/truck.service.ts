import {
  TruckCompany,
  TruckCompanyDocument,
} from './../truckCompany/truckCompany.schema';
import { CreateTruckDto } from './dto/createTruck.dto';
import { GetTruckModel } from './models/getTruck.model';
import { Vehicle, VehicleDocument } from 'src/modules/vehicle/vehicle.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTruckModel } from './models/createTruck.model';
import { Truck, TruckDocument, TruckStatus } from './truck.schema';
import { UpdateTruckDto } from './dto/updateTruck.dto';

@Injectable()
export class TruckService {
  constructor(
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(TruckCompany.name)
    private truckCompanyModel: Model<TruckCompanyDocument>,
  ) {}

  async createTruck(createTruckDto: CreateTruckDto): Promise<CreateTruckModel> {
    const createdTruck = await new this.truckModel(createTruckDto);
    await createdTruck.save();
    return new CreateTruckModel(createdTruck);
  }

  async findAll(status): Promise<GetTruckModel[]> {
    const trucks = await this.truckModel
      .find(status ? { status: status } : {})
      .exec();

    const trucksWithVehicles: GetTruckModel[] = [];
    for (const truck of trucks) {
      const vehicles = await this.vehicleModel
        .find({ _id: { $in: truck.vehicleIds } })
        .exec();
      const truckCompany = await this.truckCompanyModel
        .findById(truck.truckCompanyId)
        .exec();
      trucksWithVehicles.push(new GetTruckModel(truck, vehicles, truckCompany));
    }
    return trucksWithVehicles;
  }

  async findOne(id: string): Promise<GetTruckModel> {
    const truck = await this.truckModel.findById(id).exec();
    if (truck.vehicleIds.length === 0) {
      return new GetTruckModel(truck);
    }

    const vehicles = await this.vehicleModel
      .find({ _id: { $in: truck.vehicleIds } })
      .exec();

    return new GetTruckModel(truck, vehicles);
  }

  async update(id: string, truck: UpdateTruckDto): Promise<Truck> {
    return this.truckModel.findByIdAndUpdate(id, truck, { new: true }).exec();
  }

  async delete(id: string): Promise<Truck> {
    return this.truckModel.findByIdAndDelete(id).exec();
  }
}
