import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/user/model/user.type.enum';

export type RestaurantDocument = Restaurant & Document;

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

  @Prop({
    type: String,
  })
  owner: string;

//   @Prop({
//     type: String,
//     enum: [UserRole.Owner, UserRole.Customer],
//     //default: UserRole.Admin
//   })
//   userType: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
