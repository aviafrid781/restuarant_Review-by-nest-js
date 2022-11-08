import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateReviewDto {
  readonly restaurantId: string;
  @IsEmail()
  readonly customer: string;
  @IsNotEmpty()
  readonly review: string;
  readonly comment: string;
  
}
