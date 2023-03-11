import { IJwtPayload } from './jwtPayload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super({
      // HIDE THIS TOP SECRET
      secretOrKey: 'CHARLIE TOPPER',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user: User = await this.userModel
      .findOne({ email })
      .select('-password')
      .exec();

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
