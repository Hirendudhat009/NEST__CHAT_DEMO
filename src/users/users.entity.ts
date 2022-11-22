import {
  Column,
  Entity,
  MigrationInterface,
  PrimaryGeneratedColumn,
  QueryRunner,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() password: string;
  @Column() is_online: number;
}
