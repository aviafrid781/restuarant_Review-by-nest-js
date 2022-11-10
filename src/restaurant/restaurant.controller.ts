import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { UserI } from 'src/user/interfaces/user.interface';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @GetUser() user: UserI,
  ) {
    return await this.restaurantService.createRestaurant(
      createRestaurantDto.name,
      createRestaurantDto.email,
      createRestaurantDto.address,
      createRestaurantDto.owner,
      user,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser() user: UserI) {
    return this.restaurantService.findAll(user);
  }
}
