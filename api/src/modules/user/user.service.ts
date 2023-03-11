import { UpdateUserDto } from './dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserModel } from './models/createUser.mode';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(userId: string): Promise<CreateUserModel> {
    const foundUser = await this.userModel.findById(userId).exec();
    return new CreateUserModel(foundUser);
  }

  async getAllUsers(): Promise<CreateUserModel[]> {
    const foundUsers = await this.userModel.find().exec();
    const allUsers = foundUsers.map((user) => new CreateUserModel(user));
    return allUsers;
  }

  async updateUser(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<CreateUserModel> {
    const updateUser = await this.userModel
      .findByIdAndUpdate(userId, userData, { new: true })
      .exec();
    return new CreateUserModel(updateUser);
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
