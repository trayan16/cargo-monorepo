import { ContainerDocument, ContainerStatus } from './../container.schema';

export class CreateContainerModel {
  public id: string;
  public status: ContainerStatus;
  public expectedDate: Date;
  public shippingLineId: string;
  public vehicleIds: string[];
  public documentIds: string[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(container: ContainerDocument) {
    this.id = container._id;
    this.status = container.status;
    this.expectedDate = container.expectedDate;
    this.shippingLineId = container.shippingLineId;
    this.vehicleIds = container.vehicleIds;
    this.documentIds = container.documentIds;
    this.createdAt = container.createdAt;
    this.updatedAt = container.updatedAt;
  }
}
