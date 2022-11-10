import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
@Injectable()
export class UserService {
  // findOne: any;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async createUser(
    fname: string,
    lname: string,
    email: string,
    password: string,
    address: string,
    userType: string,
  ) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const exitUser = await this.userModel.findOne({ email });
    if (!exitUser)
      {
      const user = {
        fname: fname,
        lname: lname,
        email: email,
        password: hashPassword,
        address: address,
        userType: userType,
      };
      const createdUser = await this.userModel.create(user);
      return createdUser;

      }
      else 
      {
        return "your email is already used"
      }
  }

  async findAll(limit: string, skip: string) {
    const limitValue = parseInt(limit) || 2;
    const skipValue = parseInt(skip) || 0;
    this.logger.log(skipValue);
    const users = await this.userModel.find().skip(skipValue).limit(limitValue);
    return users;
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
