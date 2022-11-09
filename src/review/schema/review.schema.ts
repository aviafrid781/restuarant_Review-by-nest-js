import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Restaurant } from 'src/restaurant/schema/restaurant.schema';
export type ReviewDocument = Review & Document;
import mongoose from 'mongoose';
@Schema()
export class Review {

  @Prop({
    type: String,
  })
  customer: string;

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
