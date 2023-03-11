import { LocationDocument } from '../location.schema';

export class LocationModel {
  public id: string;
  public auctionId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(location: LocationDocument) {
    this.id = location._id;
    this.auctionId = location.auctionId;
    this.createdAt = location.createdAt;
    this.updatedAt = location.updatedAt;
  }
}
