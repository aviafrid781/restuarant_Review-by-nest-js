import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type RestaurantDocument = Restaurant & Document;
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Restaurant {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  address: string;

 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
