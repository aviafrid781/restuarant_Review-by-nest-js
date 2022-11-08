import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from 'src/restaurant/schema/restaurant.schema';
import { UserI } from 'src/user/interfaces/user.interface';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Document>,
  ) {}

  async createReview(
    restaurantId: string,
    customer: string,
    review: string,
    comment: string,
    user: UserI,
  ) {
    console.log(user);

    if (user.userType == 'customer') {
      const reviews = {
        restaurantId: restaurantId,
        customer: customer,
        review: review,
        comment: comment,
      };
      const createdReview = await this.reviewModel.create(reviews);
      // createdUser.save();
      return createdReview;
    } else {
      throw new UnauthorizedException('Sorry!! You are not owner of Customer');
    }
  }
}
