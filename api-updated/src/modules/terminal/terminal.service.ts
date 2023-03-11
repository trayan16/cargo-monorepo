import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TerminalDto } from './dto/terminal.dto';
import { TerminalModel } from './models/terminal.model';
import { Terminal, TerminalDocument } from './terminal.schema';

@Injectable()
export class TerminalService {
  constructor(
    @InjectModel(Terminal.name)
    private readonly terminalModel: Model<TerminalDocument>,
  ) {}

  async create(createTerminalDto: TerminalDto): Promise<TerminalModel> {
    const createdTerminal = await new this.terminalModel(createTerminalDto);
    await createdTerminal.save();
    return new TerminalModel(createdTerminal);
  }

  async findOne(id: string): Promise<TerminalModel> {
    const foundTerminal = await this.terminalModel.findById(id).exec();
    return new TerminalModel(foundTerminal);
  }

  async findAll(): Promise<TerminalModel[]> {
    const terminals = await this.terminalModel.find().exec();
    const allTerminal: TerminalModel[] = terminals.map(
      (term) => new TerminalModel(term),
    );
    return allTerminal;
  }

  async update(
    id: string,
    updateTerminalDto: TerminalDto,
  ): Promise<TerminalModel> {
    const updatedTerminal = await this.terminalModel
      .findByIdAndUpdate(id, updateTerminalDto, { new: true })
      .exec();
    return new TerminalModel(updatedTerminal);
  }

  async delete(id: string): Promise<void> {
    await this.terminalModel.findByIdAndRemove(id).exec();
  }
}
