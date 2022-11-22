import {
  Column,
  Entity,
  MigrationInterface,
  PrimaryGeneratedColumn,
  QueryRunner,
} from 'typeorm';

@Entity({ name: 'cancel-task-reason' })
export class CancelTaskReason {
  @PrimaryGeneratedColumn() id: number;
  @Column() type: number;
  @Column() reason: string;
}

// export class Seeding implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.manager.save(User, {
//       type: 1,
//       reason: 'hirendkj',
//     });
//   }
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     // await queryRunner.manager.save(User, {
//     //   type: 1,
//     //   reason: 'hirendkj',
//     // });
//   }
// }
