import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { UserI } from 'src/user/interfaces/user.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() createReview: CreateReviewDto,
    @GetUser() user: UserI,
  ) {
    return await this.reviewService.createReview(
      createReview.restaurantId,
      createReview.customer,
      createReview.review,
      createReview.comment,
      user,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Param('review') review: number, @GetUser() user: UserI) {
    return this.reviewService.findAll(user);
  }
}
