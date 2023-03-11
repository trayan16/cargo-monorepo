import { DocDocument } from '../document.schema';

export class DocumentModel {
  public id: string;
  public name: string;
  public path: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(doc: DocDocument) {
    this.id = doc._id;
    this.name = doc.name;
    this.path = doc.path;
    this.createdAt = doc.createdAt;
    this.updatedAt = doc.updatedAt;
  }
}
