import { Document } from 'mongoose';
export interface RestaurantI extends Document {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  //readonly userId: string;
  readonly owner: string;
}
