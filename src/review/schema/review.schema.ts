import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Restaurant } from 'src/restaurant/schema/restaurant.schema';
import { User } from 'src/user/schema/user.schema';
export type ReviewDocument = Review & Document;
@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({
    type: Number,
  })
  review: number;

  @Prop({
    type: String,
  })
  comment: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Restaurant;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
