import { VehicleDocument, VehicleStatus } from './../vehicle.schema';

export class CreateVehicleModel {
  public id: string;
  public vin: string;
  public status: VehicleStatus;
  public stockNumber: string;
  public auctionId: string;
  public auctionLocationId: string;
  public userId: string;
  public containerId: string;
  public loadingTerminalId: string;
  public documentIds: string[];
  public truckId: string;
  public images: string[];
  public shipperLink: string;
  public keys: boolean;
  public destination: string;
  public expectedDate: Date;
  public description: string;
  public notes: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(vehicle: VehicleDocument) {
    this.id = vehicle._id;
    this.vin = vehicle.vin;
    this.status = vehicle.status;
    this.stockNumber = vehicle.stockNumber;
    this.auctionId = vehicle.auctionId;
    this.auctionLocationId = vehicle.auctionLocationId;
    this.userId = vehicle.userId;
    this.containerId = vehicle.containerId;
    this.loadingTerminalId = vehicle.loadingTerminalId;
    this.documentIds = vehicle.documentIds;
    this.truckId = vehicle.truckId;
    this.images = vehicle.images;
    this.shipperLink = vehicle.shipperLink;
    this.keys = vehicle.keys;
    this.destination = vehicle.destination;
    this.expectedDate = vehicle.expectedDate;
    this.description = vehicle.description;
    this.notes = vehicle.notes;
    this.createdAt = vehicle.createdAt;
    this.updatedAt = vehicle.updatedAt;
  }
}
