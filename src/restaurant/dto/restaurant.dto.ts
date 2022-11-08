import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateRestaurantDto {
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly address: string;
  readonly owner: string;
 
}
