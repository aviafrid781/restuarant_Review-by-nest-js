import { IsNotEmpty, Max, Min } from 'class-validator';
export class CreateReviewDto {
  readonly restaurantId: string;
  readonly customer: string;
  @IsNotEmpty()
  readonly review: number;
  @IsNotEmpty()
  readonly comment: string;
}
