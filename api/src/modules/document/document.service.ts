import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc, DocDocument } from './document.schema';

@Injectable()
export class DocumentService {
  constructor(@InjectModel(Doc.name) private docModel: Model<DocDocument>) {}

  async create(createDocDto: Doc): Promise<Doc> {
    const createdDoc = new this.docModel(createDocDto);
    return createdDoc.save();
  }

  async findAll(): Promise<Doc[]> {
    return this.docModel.find().exec();
  }

  async findOne(id: string): Promise<Doc> {
    return this.docModel.findById(id).exec();
  }

  async update(id: string, updateDocDto: Doc): Promise<Doc> {
    return this.docModel
      .findByIdAndUpdate(id, updateDocDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.docModel.findByIdAndRemove(id).exec();
  }
}
