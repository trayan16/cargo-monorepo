import { GetLocationModel } from './models/getLocation.model';
import { LocationModel } from './models/location.model';
import { LocationDto } from './dto/location.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Location } from './location.schema';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() location: LocationDto): Promise<LocationModel> {
    return this.locationService.create(location);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<GetLocationModel> {
    return this.locationService.findById(id);
  }

  @Get()
  async findAll(): Promise<GetLocationModel[]> {
    return this.locationService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() location: Location,
  ): Promise<Location> {
    return this.locationService.update(id, location);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Location> {
    return this.locationService.delete(id);
  }
}
