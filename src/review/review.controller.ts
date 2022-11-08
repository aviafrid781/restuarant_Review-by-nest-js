import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/user/get-user.decorator';
import { UserI } from 'src/user/interfaces/user.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  //  @UseGuards(AuthGuard('jwt'))
  async createRestaurant(
    @Body() createReview: CreateReviewDto,
    @GetUser() user: UserI,
  ) {
    return await this.reviewService.createReview(
      createReview.restaurantId,
      createReview.customer,
      // createRestaurantDto.userId,
      createReview.review,
      createReview.comment,
      user,
    );
  }
}
