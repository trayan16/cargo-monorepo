import { MessageDocument } from './../message.schema';

export class MessageModel {
  public id: string;
  public type: string;
  public old_status: string;
  public new_status: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(message: MessageDocument) {
    this.id = message._id;
    this.type = message.type;
    this.old_status = message.old_status;
    this.new_status = message.new_status;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}
