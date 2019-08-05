import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity({
  name: 'cms_messages',
})
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Contact, contact => contact.messages)
  contact: Contact;

  @Column({ length: 10000 })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
