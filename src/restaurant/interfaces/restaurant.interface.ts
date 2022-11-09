import { Document } from 'mongoose';
export interface RestaurantI extends Document {
  name: string;
  email: string;
  address: string;
  owner: string;
}
