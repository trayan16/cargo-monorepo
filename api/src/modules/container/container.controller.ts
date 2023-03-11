import { GetContainerModel } from './models/getContainer.model';
import { CreateContainerModel } from './models/createContainer.model';
import { CreateContainerDto } from './dto/createContainer.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { Container } from './container.schema';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containersService: ContainerService) {}

  @Post()
  async create(
    @Body() container: CreateContainerDto,
  ): Promise<CreateContainerModel> {
    return this.containersService.create(container);
  }

  @Get()
  async findAll(): Promise<Container[]> {
    return this.containersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetContainerModel> {
    return this.containersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() container: Container,
  ): Promise<Container> {
    return this.containersService.update(id, container);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.containersService.delete(id);
  }
}
