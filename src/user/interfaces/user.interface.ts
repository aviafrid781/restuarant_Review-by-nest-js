import { Document } from 'mongoose';
export interface UserI extends Document {
  fname: string;
  lname: string;
  password: string;
  email: string;
  address: string;
  userType: string;
  created_at: string;
  updated_at: string;
}
