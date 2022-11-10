import {
  Get,
  Injectable,
  Logger,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { GetUser } from 'src/user/get-user.decorator';
import { UserI } from 'src/user/interfaces/user.interface';
import { Restaurant } from './schema/restaurant.schema';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<Document>,
    private readonly logger: Logger,
  ) {}

  async createRestaurant(
    name: string,
    email: string,
    address: string,
    owner: string,
    user: UserI,
  ) {
    this.logger.log(user);
    if (user.userType == 'owner') {
      const restaurant = {
        name: name,
        email: email,
        address: address,
        owner: owner,
      };
      const createdRestaurant = await this.restaurantModel.create(restaurant);

      return createdRestaurant;
    } else {
      throw new UnauthorizedException(
        'Sorry!! You are not owner of restaurant',
      );
    }
  }

  async allRestaurants(user: UserI) {
    if (user.userType == 'owner') {
      const reviews = await this.restaurantModel.find().populate('owner');

      return reviews;
    } else {
      throw new UnauthorizedException(
        'You can not  see restaurant list! You are not owner of Owner',
      );
    }
  }
}
