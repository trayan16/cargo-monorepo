import { Doc, DocSchema } from './document.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentsModule {}
