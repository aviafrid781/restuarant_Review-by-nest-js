import { IsNotEmpty } from 'class-validator';
export class CreateReviewDto {
  @IsNotEmpty()
  readonly restaurantId: string;
  @IsNotEmpty()
  readonly customer: string;
  @IsNotEmpty()
  readonly review: number;
  @IsNotEmpty()
  readonly comment: string;
}
