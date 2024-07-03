import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username'})
  username: string;

  @Column({ name: 'password'})
  password: string;

  @Column({ name: 'refreshToken', default: '' })
  refreshToken: string;

  @ManyToMany(() => Book, (book) => book.users)
  books: Book[];
}
