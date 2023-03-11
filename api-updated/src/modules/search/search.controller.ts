import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OptionalAuth } from '../auth/optionalAuth.guard';
import { SearchVehicleService } from './search.service';

@Controller('search')
export class SearchVehicleController {
  constructor(private readonly searchVehicle: SearchVehicleService) {}

  @UseGuards(OptionalAuth)
  @Get()
  async searchByVin(@Query('vin') vin: string) {
    const vehicle = await this.searchVehicle.searchByVin(vin);
    return vehicle;
  }
}
