import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Book } from 'src/entities/book.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

config();
console.log(process.cwd());

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>(process.env.DATABASE_HOST) || 'localhost',
  port: configService.get<number>(process.env.DATABASE_PORT) || 5432,
  username:
    configService.get<string>(process.env.DATABASE_USERNAME) || 'postgres',
  password: configService.get<string>(process.env.DATABASE_PASSWORD) || '1234',
  database: configService.get<string>(process.env.DATABASE) || 'test',
  synchronize: false,
  migrations: ['migrations/**'],
  entities: [UserEntity, Book, Invoice],
});
