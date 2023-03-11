import { GetContainerModel } from './models/getContainer.model';
import { Vehicle, VehicleDocument } from 'src/modules/vehicle/vehicle.schema';
import {
  ShippingLine,
  ShippingLineDocument,
} from './../shippingLine/shippingLine.schema';
import { CreateContainerModel } from './models/createContainer.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Container, ContainerDocument } from './container.schema';
import { CreateContainerDto } from './dto/createContainer.dto';
import { Doc, DocDocument } from '../document/document.schema';

@Injectable()
export class ContainerService {
  constructor(
    @InjectModel(Container.name)
    private containerModel: Model<ContainerDocument>,
    @InjectModel(ShippingLine.name)
    private shippingLineModel: Model<ShippingLineDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Doc.name) private documentModel: Model<DocDocument>,
  ) {}

  async create(container: CreateContainerDto): Promise<CreateContainerModel> {
    const createdContainer = await new this.containerModel(container);
    await createdContainer.save();
    return new CreateContainerModel(createdContainer);
  }

  async findAll(): Promise<Container[]> {
    return this.containerModel.find().exec();
  }

  async findOne(id: string): Promise<GetContainerModel> {
    const foundContainer = await this.containerModel.findById(id);
    const resources = await this.getNestedContainerResources(
      foundContainer.shippingLineId,
      foundContainer.vehicleIds,
      foundContainer.documentIds,
    );

    // TODO: TEST THIS !!

    // return this.containerModel
    //   .findById(id)
    //   .populate('shippingLineId')
    //   .populate('vehicleIds')
    //   .populate('documentIds')
    //   .exec();
    return new GetContainerModel(foundContainer, resources);
  }

  async update(id: string, container: Container): Promise<Container> {
    return this.containerModel
      .findByIdAndUpdate(id, container, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.containerModel.findByIdAndDelete(id).exec();
  }

  async getNestedContainerResources(
    shippingLineId: string,
    vehicleIds: string[],
    documentIds: string[],
  ) {
    let containerResources = {};

    const shippingLine: ShippingLine = await this.shippingLineModel
      .findById(shippingLineId)
      .exec();

    const docs: Doc[] = await this.documentModel
      .find({ _id: { $in: documentIds } })
      .exec();

    const vehicles: Vehicle[] = await this.vehicleModel
      .find({ _id: { $in: vehicleIds } })
      .exec();

    if (shippingLine || vehicles.length > 0 || docs.length > 0) {
      containerResources = {
        shippingLine,
        vehicles,
        docs,
      };
      return containerResources;
    }
  }
}
