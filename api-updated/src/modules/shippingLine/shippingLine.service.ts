import { ShippingLineDocument } from './shippingLine.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShippingLineDto } from './dto/createShippingLine.dto';
import { UpdateShippingLineDto } from './dto/updateShippingLine.dto';
import { ShippingModel } from './models/shippingLine.model';

@Injectable()
export class ShippingLineService {
  constructor(
    @InjectModel('ShippingLine')
    private readonly shippingLineModel: Model<ShippingLineDocument>,
  ) {}

  async create(
    createShippingLineDto: CreateShippingLineDto,
  ): Promise<ShippingModel> {
    const createdShippingLine = await new this.shippingLineModel(
      createShippingLineDto,
    );
    await createdShippingLine.save();
    return new ShippingModel(createdShippingLine);
  }

  async findOne(id: string): Promise<ShippingModel> {
    const foundShippingLine = await this.shippingLineModel.findById(id).exec();
    return new ShippingModel(foundShippingLine);
  }

  async findAll(): Promise<ShippingModel[]> {
    const foundShippingLines = await this.shippingLineModel.find().exec();
    const allShippingLines = [];
    for (const shLine of foundShippingLines) {
      allShippingLines.push(new ShippingModel(shLine));
    }
    return allShippingLines;
  }

  async update(
    id: string,
    updateShippingLineDto: UpdateShippingLineDto,
  ): Promise<ShippingModel> {
    const updatedShippingLine = await this.shippingLineModel
      .findByIdAndUpdate(id, updateShippingLineDto, { new: true })
      .exec();
    return new ShippingModel(updatedShippingLine);
  }

  async delete(id: string): Promise<void> {
    await this.shippingLineModel.findByIdAndRemove(id).exec();
  }
}
