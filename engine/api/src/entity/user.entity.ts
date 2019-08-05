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
import { Profiler } from 'inspector';
import { Profile } from './profile.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 1000 })
  content: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @Column({ default: false })
  isDev: boolean;

  @OneToOne(type => Profile)
  @JoinColumn({ name: 'fk_profile_id' })
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
