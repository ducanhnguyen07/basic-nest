import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import bookFactory from '../factories/book.factory';
import userFactory from '../factories/user.factory';
import BookSeeder from './book.seed';
import UserSeeder from './user.seed';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, BookSeeder],
      factories: [userFactory, bookFactory],
    });
  }
}