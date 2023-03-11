import { IsMongoId, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  name: string;

  @IsString()
  @IsMongoId()
  auctionId: string;
}
