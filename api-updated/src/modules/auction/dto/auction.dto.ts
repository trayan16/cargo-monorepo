import { IsString } from 'class-validator';

export class AuctionDto {
  @IsString()
  name: string;

  @IsString()
  trackingUrl: string;
}
