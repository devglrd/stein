import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProgramingLanguage } from './programing-language.entity';
import { User } from './user.entity';
import { Contact } from './contact.entity';

@Entity({
  name: 'cms_profiles',
})
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ProgramingLanguage, language => language.id)
  programingLanguage: ProgramingLanguage;

  @OneToMany(type => Contact, contact => contact.profile)
  contacts: Contact[];

  @Column({ nullable: true })
  tjm: number;
}
