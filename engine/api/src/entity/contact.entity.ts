import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProgramingLanguage } from './programing-language.entity';
import { Message } from './message.entity';
import { Profile } from './profile.entity';

@Entity({
  name: 'cms_contacts',
})
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'fk_sender_id' })
  sender: User;

  @OneToOne(type => User)
  @JoinColumn({ name: 'fk_receveir_id' })
  receiver: User;

  @OneToOne(type => ProgramingLanguage)
  @JoinColumn({ name: 'fk_programing_id' })
  programingLangague: ProgramingLanguage;

  @ManyToOne(type => Profile, profile => profile.contacts)
  profile: Profile;

  @Column()
  price: number;

  @OneToMany(type => Message, message => message.contact)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
