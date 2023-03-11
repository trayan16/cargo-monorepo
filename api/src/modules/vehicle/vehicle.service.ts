import { CreateVehicleDto } from './dto/createVehicle.dto';
import { Vehicle, VehicleDocument } from './vehicle.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';
import { CreateVehicleModel } from './models/createVehicle.model';
import { GetVehicleModel } from './models/getVehicle.model';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createVehicle(
    vehicleDto: CreateVehicleDto,
  ): Promise<CreateVehicleModel> {
    const createVehicle = await new this.vehicleModel(vehicleDto);
    await createVehicle.save();
    return new CreateVehicleModel(createVehicle);
  }

  async findAllVehicles(): Promise<GetVehicleModel[]> {
    const allVehicles = await this.vehicleModel
      .find({ userId: this.request['user']._id })
      .populate('containerId')
      .populate('userId', '-password')
      .populate('documentIds')
      .populate('auctionId')
      .populate('auctionLocationId')
      .populate('truckId')
      .populate('loadingTerminalId')
      .exec();

    return allVehicles.map((vehicle) => {
      const vehicleResources = {
        container: vehicle.containerId,
        user: vehicle.userId,
        documents: vehicle.documentIds,
      };
      return new GetVehicleModel(vehicle, vehicleResources);
    });
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleModel
      .findById(id)
      .populate('containerId')
      .populate('userId', '-password')
      .populate('documentIds')
      .populate('auctionId')
      .populate('auctionLocationId')
      .populate('truckId')
      .populate('loadingTerminalId');

    const vehicleResources = {
      container: vehicle.containerId,
      user: vehicle.userId,
      documents: vehicle.documentIds,
    };
    return new GetVehicleModel(vehicle, vehicleResources);
  }

  async updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();
  }

  async deleteVehicle(id: string): Promise<Vehicle> {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }

  // async getNestedVehicleResources(
  //   auctionId: string,
  //   auctionLocationId: string,
  //   userId: string,
  //   containerId: string,
  //   loadingTerminalId: string,
  //   truckId: string,
  //   documentIds: string[],
  // ) {
  //   let vehicleResources = {};
  //   const truck = await this.truckModel.findById(truckId).exec();
  //   const auction = await this.auctionModel.findById(auctionId).exec();
  //   const auctionLocation = await this.auctionLocationModel
  //     .findById(auctionLocationId)
  //     .exec();
  //   const container = await this.containerModel.findById(containerId).exec();
  //   const terminal = await this.terminalModel
  //     .findById(loadingTerminalId)
  //     .exec();
  //   const user = await this.userModel.findById(userId).exec();
  //   const docs = await this.docsModel
  //     .find({ _id: { $in: documentIds } })
  //     .exec();

  //   if (
  //     truck ||
  //     auction ||
  //     auctionLocation ||
  //     container ||
  //     terminal ||
  //     user ||
  //     docs.length > 0
  //   ) {
  //     vehicleResources = {
  //       truck,
  //       auction,
  //       auctionLocation,
  //       container,
  //       terminal,
  //       user,
  //       docs,
  //     };
  //     return vehicleResources;
  //   }
  // }
}
