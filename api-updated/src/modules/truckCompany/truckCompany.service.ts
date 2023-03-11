import { UpdateTruckCompanyDto } from './dto/updateTruckCompany.dto';
import { TruckCompanyModel } from './models/truckCompany.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTruckCompanyDto } from './dto/createTruckCompany.dto';
import { TruckCompany, TruckCompanyDocument } from './truckCompany.schema';

@Injectable()
export class TruckCompanyService {
  constructor(
    @InjectModel(TruckCompany.name)
    private readonly truckCompanyModel: Model<TruckCompanyDocument>,
  ) {}

  async create(
    createTruckCompanyDto: CreateTruckCompanyDto,
  ): Promise<TruckCompanyModel> {
    const createdTruckCompany = await new this.truckCompanyModel(
      createTruckCompanyDto,
    );
    await createdTruckCompany.save();
    return new TruckCompanyModel(createdTruckCompany);
  }

  async findOne(id: string): Promise<TruckCompanyModel> {
    const foundTruckCompany = await this.truckCompanyModel.findById(id).exec();
    return new TruckCompanyModel(foundTruckCompany);
  }

  async findAll(): Promise<TruckCompanyModel[]> {
    const foundCompaines = await this.truckCompanyModel.find().exec();
    const allTruckCompanies = foundCompaines.map(
      (company) => new TruckCompanyModel(company),
    );
    return allTruckCompanies;
  }

  async update(
    id: string,
    updateTruckCompanyDto: UpdateTruckCompanyDto,
  ): Promise<TruckCompanyModel> {
    const updatedTruckCompany = await this.truckCompanyModel
      .findByIdAndUpdate(id, updateTruckCompanyDto, { new: true })
      .exec();
    return new TruckCompanyModel(updatedTruckCompany);
  }

  async delete(id: string): Promise<void> {
    await this.truckCompanyModel.findByIdAndRemove(id).exec();
  }
}
