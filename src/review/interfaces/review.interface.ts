import { Document } from 'mongoose';
export interface ReviewI extends Document {
  readonly fname: string;
  readonly restaurantId: string;
  readonly review: string;
  readonly customer: string;
  
}
