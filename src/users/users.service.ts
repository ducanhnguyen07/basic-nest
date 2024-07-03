import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { IInvoiceByUser } from 'src/interfaces/invoiceByUser.interface';
import { Book } from 'src/entities/book.entity';
import { CreateUserResponseDto } from './dto/response/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Book)
    private readonly invoiceRepository: Repository<Book>,
  ) {}

  async findUser(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    const users = await this.userRepository.find();
    return users.find((user) => user.username === username);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto | string> {
    try {
      const userId = createUserDto.id;
      const existedUser = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (existedUser) {
        throw new ConflictException('User already exists');
      } else {
        createUserDto.password = this.getHashPassword(createUserDto.password);

        const createdUser = await this.userRepository.save(createUserDto);
        const responseUser = plainToInstance(
          CreateUserResponseDto,
          createdUser,
          {
            excludeExtraneousValues: true, // @Expose()
          },
        );

        return responseUser;
      }
    } catch (error) {
      console.log(error);
      return 'Failed!';
    }
  }

  updateUser = async (
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> => {
    try {
      const updateUser = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!updateUser) {
        throw new NotFoundException('Not found user!');
      }

      if (updateUserDto.password) {
        updateUserDto.password = this.getHashPassword(updateUserDto.password);
      }

      Object.assign(updateUser, updateUserDto);
      const updatedUser = await this.userRepository.save(updateUser);

      const responseUser = plainToInstance(CreateUserResponseDto, updatedUser, {
        excludeExtraneousValues: true,
      });
      return responseUser;
    } catch (error) {
      throw new NotFoundException(error);
    }
  };

  deleteUser = async (id: string) => {
    const deleteUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!deleteUser) {
      throw new NotFoundException('Not found user!');
    }

    this.userRepository.delete(deleteUser);
  };

  getInvoiceByUser = async (id: string): Promise<number> => {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.books', 'books')
      .where('users.id = :id', { id })
      .getOne();

    const fee = users.books.map(book => book).reduce((acc, cur) => {
      return acc + Number(cur.fee)
    }, 0);

    return fee;
  };

  findUserByToken = async (
    refreshToken: string,
  ): Promise<UserEntity | undefined> => {
    const userByToken = await this.userRepository.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
    return userByToken;
  };

  isValidPassword = (plain: string, hash: string): boolean => {
    // return compareSync(plain, hash);
    return plain === hash;
  };

  getHashPassword = (password: string): string => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
}
