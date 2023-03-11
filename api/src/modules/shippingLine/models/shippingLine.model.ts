import { ShippingLineDocument } from './../shippingLine.schema';

export class ShippingModel {
  public id: string;
  public name: string;
  public trackUrl: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(shippingLine: ShippingLineDocument) {
    this.id = shippingLine._id;
    this.name = shippingLine.name;
    this.trackUrl = shippingLine.trackUrl;
    this.createdAt = shippingLine.createdAt;
    this.updatedAt = shippingLine.updatedAt;
  }
}
