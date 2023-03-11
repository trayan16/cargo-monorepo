import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { RoleGuard } from '../user/user.roleGuard';
import { UserRoles } from '../user/user.schema';
import JwtAuthenticationGuard from '../auth/jwtAuthentication.guard';
import { UserVehicleGuard } from './vehicle.userVehicleGuard';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(RoleGuard(true, UserRoles.ADMIN), UserVehicleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findAll() {
    return this.vehicleService.findAllVehicles();
  }

  @Post()
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Res() res: Response,
  ) {
    const newVehicle = await this.vehicleService.createVehicle(
      createVehicleDto,
    );
    res.status(HttpStatus.OK).json(newVehicle);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
