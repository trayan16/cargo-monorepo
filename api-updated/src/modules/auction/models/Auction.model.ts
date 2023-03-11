import { AuctionDocument } from '../auction.schema';

export class AuctionModel {
  public id: string;
  public name: string;
  public trackingUrl: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(auction: AuctionDocument) {
    this.id = auction._id;
    this.name = auction.name;
    this.trackingUrl = auction.trackingUrl;
    this.createdAt = auction.createdAt;
    this.updatedAt = auction.updatedAt;
  }
}
