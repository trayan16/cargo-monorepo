import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserModel } from './models/createUser.mode';
import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<CreateUserModel> {
    return this.userService.getUser(userId);
  }

  @Get()
  async getAllUsers(): Promise<CreateUserModel[]> {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userData: UpdateUserDto,
  ): Promise<CreateUserModel> {
    return this.userService.updateUser(userId, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
