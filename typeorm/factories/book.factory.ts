import { setSeederFactory } from 'typeorm-extension';

import { Book } from '../../src/entities/book.entity';
import { faker } from '@faker-js/faker';

import { uuid } from 'uuidv4';

export default setSeederFactory(Book, async () => {
  const book = new Book();

  book.id = uuid();
  book.name = faker.lorem.words(3);
  book.description = faker.lorem.sentences(2);
  book.fee = faker.number.int({ min: 0, max: 100 });

  return book;
});