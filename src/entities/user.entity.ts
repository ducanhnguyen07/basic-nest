import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username'})
  username: string;

  @Column({ name: 'password'})
  password: string;

  @Column({ name: 'refreshToken', default: '' })
  refreshToken: string;

  @ManyToMany(() => Book, (book) => book.users)
  books: Book[];
}
