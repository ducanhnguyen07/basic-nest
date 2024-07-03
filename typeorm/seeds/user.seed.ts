import { hash } from 'bcryptjs';
import { UserEntity } from '../../src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    const data = {
      username: 'admin',
      password: await hash('admin', 10),
    };

    const user = await repository.findOneBy({ username: data.username });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(UserEntity);

    // Insert only one record.
    await userFactory.save();

    // Insert many records in database.
    await userFactory.saveMany(40);
  }
}