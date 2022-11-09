import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant, RestaurantSchema } from './schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),

    RestaurantModule,
  ],

  controllers: [RestaurantController],
  providers: [RestaurantService, Logger],
  exports: [MongooseModule],
})
export class RestaurantModule {}
