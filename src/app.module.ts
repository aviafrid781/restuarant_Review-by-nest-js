import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReviewModule } from './review/review.module';
//6NXhRsDpLSjD2r9y
//restaurant
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://restaurant:6NXhRsDpLSjD2r9y@cluster0.tamfjg8.mongodb.net/?retryWrites=true&w=majority`,
    ),

    UserModule,

    RestaurantModule,

    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
