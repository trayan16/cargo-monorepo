import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './vehicle.schema';

@Injectable()
export class UserVehicleGuard implements CanActivate {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const userId = request.user.id;
    const userVehicleMatch = await this.vehicleModel.find(
      { userId },
      { _id: 1 },
    );

    if (userVehicleMatch) {
      return true; // Request is authorized
    } else {
      throw new UnauthorizedException('User does not have a vehicle');
    }
  }
}

export const UserVehicleGuardMixin = mixin(UserVehicleGuard);
