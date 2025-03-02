/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UserService } from '../user/user.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthUser } from './interfaces/request.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto) {
    this.logger.log(`Attempting to sign up with email: ${signUpDto.email}`);
    try {
      const user = await this.userService.findByEmail(signUpDto.email);
      if (user) {
        throw new BadRequestException(
          'User Already Registered With The Same Email',
        );
      }
      const createdUser = this.userService.createUser(signUpDto);
      this.logger.log('Sign up successful');

      return { message: 'Sign up successful', user: createdUser };
    } catch (error) {
      this.logger.error(`Sign up failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  public async signIn(user: AuthUser) {
    this.logger.log(`Attempting to sign in with email: ${user.email}`);
    try {
      const payload = { sub: user._id, email: user.email, name: user.name };
      console.log('payload', payload);

      const accessToken = await this.jwtService.signAsync(payload);
      this.logger.log('Sign in successful');
      return {
        message: 'Sign in successful',
        user,
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Sign in failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    return user && (await bcrypt.compare(password, user.password))
      ? user
      : null;
  }

  async validateUserById(userId: string): Promise<UserDocument | null> {
    const user = await this.userService.findById(userId);
    return user || null;
  }
}
