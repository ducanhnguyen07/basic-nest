import { Book } from './book.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('invoices')
export class Invoice {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ name: 'bookId' })
  bookId: number;

  @ManyToOne(() => UserEntity, user => user.id, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => Book, book => book.id, { cascade: true })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
