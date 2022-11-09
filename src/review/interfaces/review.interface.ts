import { Document } from 'mongoose';
export interface ReviewI extends Document {
  fname: string;
  restaurantId: string;
  review: number;
  customer: string;
}
