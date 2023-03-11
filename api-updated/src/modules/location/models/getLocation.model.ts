import { Auction, AuctionDocument } from './../../auction/auction.schema';
import { LocationDocument } from '../location.schema';

export class GetLocationModel {
  public id: string;
  public auction: Auction;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(location: LocationDocument, auction: AuctionDocument) {
    this.id = location._id;
    this.auction = auction;
    this.createdAt = location.createdAt;
    this.updatedAt = location.updatedAt;
  }
}
