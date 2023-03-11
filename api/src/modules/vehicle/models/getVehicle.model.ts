import { Terminal } from './../../terminal/terminal.schema';
import { Container } from './../../container/container.schema';
import { Location } from 'src/modules/location/location.schema';
import { User } from 'src/modules/user/user.schema';
import { Auction } from './../../auction/auction.schema';
import { VehicleDocument, VehicleStatus } from './../vehicle.schema';
import { Doc } from 'src/modules/document/document.schema';
import { Truck } from 'src/modules/truck/truck.schema';

export class GetVehicleModel {
  public id: string;
  public vin: string;
  public status: VehicleStatus;
  public stockNumber: string;
  public auction: Auction;
  public auctionLocation: Location;
  public user: User;
  public container: Container;
  public loadingTerminal: Terminal;
  public documents: Doc[];
  public truck: Truck;
  public images: string[];
  public shipperLink: string;
  public keys: boolean;
  public destination: string;
  public expectedDate: Date;
  public description: string;
  public notes: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(vehicle: VehicleDocument, vehicleResources) {
    this.id = vehicle._id;
    this.vin = vehicle.vin;
    this.status = vehicle.status;
    this.stockNumber = vehicle.stockNumber;
    this.auction = vehicleResources.auction;
    this.auctionLocation = vehicleResources.auctionLocation;
    this.user = vehicleResources.user;
    this.container = vehicleResources.container;
    this.loadingTerminal = vehicleResources.loadingTerminal;
    this.documents = vehicleResources.documents;
    this.truck = vehicleResources.truck;
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

export const mapVehicles = async (
  vehicles: VehicleDocument[],
): Promise<GetVehicleModel[]> => {
  const mappedVehicles = await vehicles.map((vehicle) => {
    const vehicleResources = {
      container: vehicle.containerId,
      user: vehicle.userId,
      documents: vehicle.documentIds,
    };
    return new GetVehicleModel(vehicle, vehicleResources);
  });
  return mappedVehicles;
};
