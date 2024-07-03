import { Book } from '../../src/entities/book.entity';
import { UserEntity } from '../../src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BookSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const bookFactory = await factoryManager.get(Book);
    const books = await bookFactory.saveMany(20);

    const repository = dataSource.getRepository(UserEntity);

    const users = await repository.find({});
    for (const user of users) {
      const shouldBorrowBooks = Math.random() > 0.5;

      if (shouldBorrowBooks) {
        const borrowedBooks = books.filter(() => Math.random() > 0.5);
        user.books = borrowedBooks;
      } else {
        user.books = [];
      }
    }

    await dataSource.getRepository(UserEntity).save(users);
  }
}