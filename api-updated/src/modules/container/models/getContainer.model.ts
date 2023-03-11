import { Doc } from 'prettier';
import { Vehicle } from 'src/modules/vehicle/vehicle.schema';
import { ShippingLine } from './../../shippingLine/shippingLine.schema';
import { ContainerDocument, ContainerStatus } from './../container.schema';

export class GetContainerModel {
  public id: string;
  public status: ContainerStatus;
  public expectedDate: Date;
  public shippingLine: ShippingLine;
  public vehicles: Vehicle[];
  public documents: Doc[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(container: ContainerDocument, containerResources) {
    this.id = container._id;
    this.status = container.status;
    this.expectedDate = container.expectedDate;
    this.shippingLine = containerResources.shippingLine;
    this.vehicles = containerResources.vehicles;
    this.documents = containerResources.documents;
    this.createdAt = container.createdAt;
    this.updatedAt = container.updatedAt;
  }
}
