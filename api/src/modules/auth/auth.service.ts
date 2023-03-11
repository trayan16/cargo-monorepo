import { IJwtPayload } from './jwtPayload.interface';
import { AuthSignUpDto } from './dto/authSingUp.dto';
import { AuthSignInDto } from './dto/authSignIn.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/user/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserModel } from 'src/modules/user/models/createUser.mode';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtSerive: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto) {
    const { password } = authSignUpDto;
    // hash
    const salt: string = await bcrypt.genSalt();
    const hasedPass: string = await bcrypt.hash(password, salt);
    authSignUpDto.password = hasedPass;

    const createdUser = await new this.userModel(authSignUpDto);
    try {
      await createdUser.save();
    } catch (err) {
      throw new ConflictException('Something went wrong while creating user');
    }
    return new CreateUserModel(createdUser);
  }

  async signIn(authSignInDto: AuthSignInDto) {
    const { email, password } = authSignInDto;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { email, id: user.id };
      const accessToken: string = await this.jwtSerive.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login creds');
    }
  }
}
