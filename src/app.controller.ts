import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './decorator/customize';
import { IUser } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}  

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  getProfile(@User() user: IUser) {
    return user;
  }
}
