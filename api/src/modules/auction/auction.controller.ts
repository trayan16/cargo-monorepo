import { AuctionDto } from './dto/auction.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionModel } from './models/Auction.model';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionService) {}

  @Post()
  async create(@Body() auction: AuctionDto): Promise<AuctionModel> {
    return this.auctionsService.create(auction);
  }

  @Get()
  async findAll(): Promise<AuctionModel[]> {
    return this.auctionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuctionModel> {
    return this.auctionsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() auction: AuctionDto,
  ): Promise<AuctionModel> {
    return this.auctionsService.update(id, auction);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.auctionsService.delete(id);
  }
}
