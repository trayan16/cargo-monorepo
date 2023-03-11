import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShippingLineService } from './shippingLine.service';
import { CreateShippingLineDto } from './dto/createShippingLine.dto';
import { UpdateShippingLineDto } from './dto/updateShippingLine.dto';
import { ShippingModel } from './models/shippingLine.model';

@Controller('shipping-lines')
export class ShippingLineController {
  constructor(private readonly shippingLineService: ShippingLineService) {}

  @Post()
  create(
    @Body() createShippingLineDto: CreateShippingLineDto,
  ): Promise<ShippingModel> {
    return this.shippingLineService.create(createShippingLineDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ShippingModel> {
    return this.shippingLineService.findOne(id);
  }

  @Get()
  findAll(): Promise<ShippingModel[]> {
    return this.shippingLineService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingLineDto: UpdateShippingLineDto,
  ): Promise<ShippingModel> {
    return this.shippingLineService.update(id, updateShippingLineDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.shippingLineService.delete(id);
  }
}
