import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { StoreConfig } from 'src/interfaces/use-class.interface';
import { StoreBookLocalFactory } from 'src/helpers/store-book.helper';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @Inject('STORE_CONFIG') 
    private readonly storeConfig: StoreConfig,

    @Inject('STORE_LOCAL') 
    private readonly storeBookLocal: StoreBookLocalFactory,

  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<CreateBookDto> {
    try {
      const id = createBookDto.id;
      const existedBook = await this.bookRepository.findOne({
        where: {
          id: id,
        },
      });

      if (existedBook) {
        return existedBook;
      } else {
        const newBook = await this.bookRepository.save(createBookDto);
        return plainToInstance(CreateBookDto, newBook);
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async storeBook(id: string) {
    try {
      const book = await this.bookRepository.findOne({
        where: {
          id: id
        }
      });
      if(!book) {
        return "Failed!";
      }
      
      this.storeBookLocal.storeBookLocal(book, this.storeConfig);

      return plainToInstance(CreateBookDto, book);
    } catch (error) {
      console.log(error);
      return "Failed!";
    }
  }
}
