import { setSeederFactory } from 'typeorm-extension';

import { Book } from '../../src/entities/book.entity';
import { faker } from '@faker-js/faker';

export default setSeederFactory(Book, async () => {
  const book = new Book();

  book.id = faker.datatype.number();
  book.name = faker.lorem.words(3);
  book.description = faker.lorem.sentences(2);
  book.fee = faker.datatype.number({ min: 0, max: 100 });

  return book;
});