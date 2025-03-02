import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | undefined | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | undefined | null> {
    return this.userModel.findById(id);
  }

  async createUser(signUpDto: SignUpDto): Promise<UserDocument> {
    this.logger.log(`Creating user with email: ${signUpDto.email}`);
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = new this.userModel({ ...signUpDto, password: hashedPassword });
    return user.save();
  }
}
