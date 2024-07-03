import { setSeederFactory } from 'typeorm-extension';

import { UserEntity } from '../../src/entities/user.entity';
import { faker } from '@faker-js/faker';

import { uuid } from 'uuidv4';

export default setSeederFactory(UserEntity, async () => {
  const user = new UserEntity();

  user.id = uuid();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.refreshToken = '';

  return user;
});