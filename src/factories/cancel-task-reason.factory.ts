import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { CancelTaskReason } from '../cancel-task-reason/cancel-task-reason.entity';

define(CancelTaskReason, () => {
  // const gender = faker.random.number(1);
  // const firstName = faker.name.firstName(gender);
  // const lastName = faker.name.lastName(gender);
  console.log('hiren');

  const user = new CancelTaskReason();
  user.reason = 'dfsbj';
  user.type = 1;
  return user;
});
