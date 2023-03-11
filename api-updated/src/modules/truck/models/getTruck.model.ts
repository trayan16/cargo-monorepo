import { TruckCompany } from './../../truckCompany/truckCompany.schema';
import { Vehicle } from 'src/modules/vehicle/vehicle.schema';
import { TruckDocument, TruckStatus } from '../truck.schema';

export class GetTruckModel {
  public id: string;
  public plateNumber: string;
  public truckCompany: TruckCompany;
  public status: TruckStatus;
  public vehicles: Vehicle[];
  public expectedDate: Date;
  public notes: string;
  public cmr: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    truck: TruckDocument,
    vechiles?: Vehicle[],
    truckCompany?: TruckCompany,
  ) {
    this.id = truck._id;
    this.plateNumber = truck.plateNumber;
    this.truckCompany = truckCompany;
    this.status = truck.status;
    this.vehicles = vechiles;
    this.expectedDate = truck.expectedDate;
    this.notes = truck.notes;
    this.cmr = truck.cmr;
    this.createdAt = truck.createdAt;
    this.updatedAt = truck.updatedAt;
  }
}
