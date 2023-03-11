import { TerminalModel } from './models/terminal.model';
import { TerminalDto } from './dto/terminal.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Terminal } from './terminal.schema';
import { TerminalService } from './terminal.service';

@Controller('terminals')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post()
  async create(@Body() TerminalDto: Terminal): Promise<TerminalModel> {
    return this.terminalService.create(TerminalDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TerminalModel> {
    return this.terminalService.findOne(id);
  }

  @Get()
  async findAll(): Promise<TerminalModel[]> {
    return this.terminalService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTerminalDto: TerminalDto,
  ): Promise<TerminalModel> {
    return this.terminalService.update(id, updateTerminalDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.terminalService.delete(id);
  }
}
