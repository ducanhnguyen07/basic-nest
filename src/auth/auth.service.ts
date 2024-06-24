import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const payload = {
      sub: 'token login',
      iss: 'from server',
      username: user.username,
      id: user.id
    };

    const refreshToken = this.createRefreshToken(payload);

    const userId: number = parseInt(user.id);
    this.updateUserRefreshToken(refreshToken, userId);

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 100
    });
    
    return {
      access_token: this.jwtService.sign(payload),
      refreshToken,
      user
    };
  }

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      });

      let user = await this.usersService.findUserByToken(refreshToken);
      if(user) {
        const payload = {
          sub: 'token refresh',
          iss: 'from server',
          username: user.username,
          id: user.id
        };
    
        const refreshToken = this.createRefreshToken(payload);
    
        const userId: number = (user.id);
        this.updateUserRefreshToken(refreshToken, userId);
    
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
        });
      }

    } catch (error) {
      throw new BadRequestException(`Invalid refresh token!`);
    }
  };

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000
    });
    return refreshToken;
  };

  updateUserRefreshToken = async (refreshToken: string, id: number) => {
    await this.userRepository.update(id, { refreshToken: refreshToken });
  };
}
