import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { UserRoles } from 'src/modules/user/user.schema';

export class AuthSignUpDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
