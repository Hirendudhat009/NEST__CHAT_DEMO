import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CancelTaskReason } from '../cancel-task-reason/cancel-task-reason.entity';

export default class CreateCancelTask implements Seeder {
  // public async run(factory: Factory, connection: Connection): Promise<any> {
  //   await connection
  //     .createQueryBuilder()
  //     .insert()
  //     .into(CancelTaskReason)
  //     .values([
  //       { id: 1, reason: 'Timber', type: 1 },
  //       { id: 2, reason: 'Phantom', type: 2 },
  //     ])
  //     .execute();
  // }
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(CancelTaskReason)().createMany(1);
  }
}
// seeds: ['src/seed/seeder/**/*{.ts,.js}'],
// factories: ['src/seed/factory/**/*{.ts,.js}'],
