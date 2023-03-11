import { TruckDocument } from './../truck.schema';
import { TruckStatus } from '../truck.schema';

export class CreateTruckModel {
  public id: string;
  public plateNumber: string;
  public truckCompanyId: string;
  public status: TruckStatus;
  public vehicleIds: string[];
  public expectedDate: Date;
  public notes: string;
  public cmr: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(truck: TruckDocument) {
    this.id = truck._id;
    this.plateNumber = truck.plateNumber;
    this.truckCompanyId = truck.truckCompanyId;
    this.status = truck.status;
    this.vehicleIds = truck.vehicleIds;
    this.expectedDate = truck.expectedDate;
    this.notes = truck.notes;
    this.cmr = truck.cmr;
    this.createdAt = truck.createdAt;
    this.updatedAt = truck.updatedAt;
  }
}
