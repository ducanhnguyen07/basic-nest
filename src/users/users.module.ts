import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BooksModule } from 'src/books/books.module';
import { UserMockService } from './users-mock.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BooksModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useClass: UsersService,
    },
    
  ],
  exports: [UsersService, TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
