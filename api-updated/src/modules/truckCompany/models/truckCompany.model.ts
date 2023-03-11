import { TruckCompanyDocument } from './../truckCompany.schema';

export class TruckCompanyModel {
  public id: string;
  public name: string;
  public trackingUrl: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(truckCompany: TruckCompanyDocument) {
    this.id = truckCompany._id;
    this.name = truckCompany.name;
    this.trackingUrl = truckCompany.trackingUrl;
    this.createdAt = truckCompany.createdAt;
    this.updatedAt = truckCompany.updatedAt;
  }
}
