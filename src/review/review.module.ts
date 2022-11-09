import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),

    ReviewModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, Logger],
  exports: [MongooseModule],
})
export class ReviewModule {}
