import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserI } from 'src/user/interfaces/user.interface';
import { Restaurant } from './schema/restaurant.schema';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<Document>,
  ) {}

  async createRestaurant(
    name: string,
    email: string,
    address: string,
    owner: string,
    user: UserI,
  ) {

    console.log(user);
    if (user.userType == 'owner') {
      const restaurant = {
        name: name,
        email: email,
        address: address,
        owner: owner,
      };
      const createdRestaurant = await this.restaurantModel.create(restaurant);
      // createdUser.save();
      return createdRestaurant;
    } else {
      throw new UnauthorizedException(
        'Sorry!! You are not owner of restaurant',
      );
    }
  }
}
