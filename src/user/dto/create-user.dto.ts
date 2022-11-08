import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../model/user.type.enum';
export class CreateUserDto {
  @IsNotEmpty()
  readonly fname: string;
  @IsNotEmpty()
  readonly lname: string;
  @IsNotEmpty()
  readonly password: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly address: string;

  readonly userType: string;
}
