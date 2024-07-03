import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { IInvoiceByUser } from 'src/interfaces/invoiceByUser.interface';
import { CreateUserResponseDto } from './dto/response/create-user.dto';
import { User } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<UserEntity[]> {
    return this.usersService.findUser();
  }

  @Post('create')
  creatUser(@Body() user: CreateUserDto): Promise<CreateUserResponseDto | string> {
    return this.usersService.createUser(user);
  }

  @Patch('update/:id')
  updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.updateUser(id, user);
  }

  @Delete('delete/:id')
  deleteUser(
    @Param('id') id: string,
  ): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Get('invoice/:id')
  async getInvoiceByUser(@Param('id') id: string,): Promise<number> {
    return this.usersService.getInvoiceByUser(id);
  }

  @Get('info-user')
  getInfoUser(@User() user: any) {
    console.log(user)
  }
}
