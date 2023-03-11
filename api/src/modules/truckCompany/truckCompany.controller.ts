import { UpdateTruckCompanyDto } from './dto/updateTruckCompany.dto';
import { CreateTruckCompanyDto } from './dto/createTruckCompany.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TruckCompany } from './truckCompany.schema';
import { TruckCompanyService } from './truckCompany.service';

@Controller('truck-companies')
export class TruckCompanyController {
  constructor(private readonly truckCompanyService: TruckCompanyService) {}

  @Post()
  async create(
    @Body() createTruckCompanyDto: CreateTruckCompanyDto,
  ): Promise<TruckCompany> {
    return this.truckCompanyService.create(createTruckCompanyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TruckCompany> {
    return this.truckCompanyService.findOne(id);
  }

  @Get()
  async findAll(): Promise<TruckCompany[]> {
    return this.truckCompanyService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTruckCompanyDto: UpdateTruckCompanyDto,
  ): Promise<TruckCompany> {
    return this.truckCompanyService.update(id, updateTruckCompanyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.truckCompanyService.delete(id);
  }
}
