import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User, UserDocument } from './schema/user.schema';
import * as mongoose from 'mongoose'

@Injectable()
export class UserService {
  // findOne: any;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<mongoose.Document<unknown, any, UserDocument> & User & Document & { _id: mongoose.Types.ObjectId; }> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    console.log(' hashPassword', hashPassword);
    const user = {
      fname: createUserDto.fname ? createUserDto.fname : "",
      lname: createUserDto.lname ? createUserDto.lname : "",
      email: createUserDto.email ? createUserDto.email : "",
      password: hashPassword,
      address: createUserDto.address ? createUserDto.address : "",
      userType: createUserDto.userType ? createUserDto.userType : "",
    };
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async findAll(limit: string, skip: string, fname: string) {
    const limitValue = parseInt(limit) || 2;
    const skipValue = parseInt(skip) || 0;

    console.log(fname);
    console.log(limitValue);
    console.log(skipValue);

    const users = await this.userModel
      .find({ fname: fname })
      .sort({ fname: 1 })
      .skip(skipValue)
      .limit(limitValue);
    return users;
  }

  async find(id: string) {
    return await this.userModel.findById(id);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    user: import('mongoose').Document<unknown, any, UserDocument> &
    User &
    Document & { _id: import('mongoose').Types.ObjectId };
    accessToken: string;
  }> {
    const user = await this.userModel.findOne({ email });

    if (
      email === user.email &&
      (await bcrypt.compare(password, user.password))
    ) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { user: user, accessToken: accessToken };
    } else {
      throw new UnauthorizedException('user not found');
    }
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email: email });
  }
}
