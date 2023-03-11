import { TerminalDocument } from './../terminal.schema';

export class TerminalModel {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(terminal: TerminalDocument) {
    this.id = terminal._id;
    this.name = terminal.name;
    this.createdAt = terminal.createdAt;
    this.updatedAt = terminal.updatedAt;
  }
}
