import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';

import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/request.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './dtos/user-profile.dto';
import { SignInDto } from './dtos/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'Successful sign up' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  public async signUp(@Body() signUpDto: SignUpDto) {
    this.logger.log(`Sign up request received for email: ${signUpDto.email}`);
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'Successful sign in' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  public async signIn(
    @Body() signInDto: SignInDto,
    @Request() { user }: AuthRequest,
  ) {
    this.logger.log(`Sign up request received for email: ${user.email}`);
    const {
      accessToken,
      message,
      user: loggedInUser,
    } = await this.authService.signIn(user);
    return { accessToken, message, user: loggedInUser };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user profile',
    type: UserProfileDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public getProfile(@Request() req: Req) {
    return req.user;
  }
}
