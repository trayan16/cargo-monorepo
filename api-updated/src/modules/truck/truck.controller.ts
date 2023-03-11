import { CreateTruckDto } from './dto/createTruck.dto';
import { TruckService } from './truck.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Res,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Truck, TruckStatus } from './truck.schema';
import { Response } from 'express';
import { GetTruckModel } from './models/getTruck.model';
import { UpdateTruckDto } from './dto/updateTruck.dto';

@Controller('trucks')
export class TruckController {
  private readonly logger = new Logger(TruckController.name);

  constructor(private truckService: TruckService) {}

  // Create operation
  @Post()
  async create(
    @Body() createTruckDto: CreateTruckDto,
    @Res() res: Response,
  ): Promise<void> {
    const newTruck = await this.truckService.createTruck(createTruckDto);
    res.status(HttpStatus.OK).json(newTruck);
  }

  // Read operation (get all trucks)
  @Get()
  async findAll(
    @Query('status') status: TruckStatus,
  ): Promise<GetTruckModel[]> {
    return this.truckService.findAll(status);
  }

  // Read operation (get a single truck by ID)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetTruckModel> {
    return this.truckService.findOne(id);
  }

  // Update operation
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() truck: UpdateTruckDto,
  ): Promise<Truck> {
    return this.truckService.update(id, truck);
  }

  // Delete operation
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Truck> {
    return this.truckService.delete(id);
  }
}
