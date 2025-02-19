import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/repositories/user.repository';
import { Model } from 'mongoose';
import {
  UserDocument,
  User as UserSche,
} from '../../../../schemas/user.schema';
import { User } from '../../../../domain/user.domain';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSche.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user
      ? new User(user.id as string, user.username, user.password, user.role)
      : null;
  }

  async findByUserName(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user
      ? new User(
          user.id as string,
          user.username,
          user.password,
          user.role,
          user.token,
        )
      : null;
  }

  async setUserToken(id: string, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      id,
      { $set: { token } },
      { new: true },
    );
  }
}
