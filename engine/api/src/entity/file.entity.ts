import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PasswordTransformer } from '../utils/transformers/password.transformer';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity({
  name: 'files',
})
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5000 })
  file: string;

  @Column({ length: 1000, nullable: true })
  slug: string | null;

  @Column()
  type: string;

  @Column()
  name: string;

  @OneToOne(type => User)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
