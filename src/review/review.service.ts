//import { UserI } from './../user/interfaces/user.interface';
import { ReviewI } from './interfaces/review.interface';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserI } from 'src/user/interfaces/user.interface';
import { Review } from './schema/review.schema';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Document>,
    private readonly logger: Logger,
  ) {}

  async createReview(
    restaurantId: string,
    customer: string,
    review: number,
    comment: string,
    user: UserI,
  ) {
    this.logger.log(user);

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

  async findAll(user: UserI) {
    if (user.userType == 'customer') {
      const reviews = await this.reviewModel
        .find()
        .sort({ review: -1 })
        .populate('customer');

      return reviews;
    } else {
      throw new UnauthorizedException(
        'You can not give Review!!! You are not owner of Customer',
      );
    }
  }
}
