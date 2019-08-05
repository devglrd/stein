import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { File } from './file.entity';
import { Message } from './message.entity';
import { Profile } from './profile.entity';
import { reduce } from 'rxjs/operators';

@Entity({
  name: 'cms_programing_langagues',
})
export class ProgramingLanguage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ length: 1000, nullable: true })
  content: string;

  @OneToMany(type => Profile, profile => profile.programingLanguage, {
    eager: true,
  })
  profiles: Profile[];

  @OneToOne(type => File)
  @JoinColumn({ name: 'fk_main_file_id' })
  @Column({ nullable: true })
  file: string;

  @ManyToMany(type => File)
  @JoinTable()
  files: File[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getAverageTjm() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const tm = this.profiles.map((e: Profile) => {
      return e.tjm;
    });
    return Math.trunc(tm.reduce(reducer) / tm.length);
  }
}
