import { UserDocument } from 'src/modules/user/user.schema';

export class CreateUserModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: number;
  public role: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: UserDocument) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
