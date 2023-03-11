import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Doc } from './document.schema';

@Controller('documnets')
export class DocumentController {
  constructor(private readonly docService: DocumentService) {}

  @Post()
  async create(@Body() createDocDto: Doc): Promise<Doc> {
    return this.docService.create(createDocDto);
  }

  @Get()
  async findAll(): Promise<Doc[]> {
    return this.docService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doc> {
    return this.docService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocDto: Doc,
  ): Promise<Doc> {
    return this.docService.update(id, updateDocDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.docService.remove(id);
  }
}
