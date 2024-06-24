import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { StoreConfig } from 'src/interfaces/use-class.interface';
import { storeConfig } from 'src/configs/store.config';
import { storeBook } from 'src/helpers/store-book.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: 'STORE_CONFIG',
      useValue: storeConfig as StoreConfig,
    },
    {
      provide: 'STORE_LOCAL',
      useFactory: storeBook,
    },
  ],
  exports: [BooksService, TypeOrmModule.forFeature([Book])],
})
export class BooksModule {}
