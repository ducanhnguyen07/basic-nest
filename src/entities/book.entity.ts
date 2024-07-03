import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name'})
  name: string;

  @Column({ name: 'description'})
  description: string;

  @Column({ name: 'fee', type: 'decimal', default: 0 })
  fee: number;

  @ManyToMany(() => UserEntity, user => user.books)
  @JoinTable({
    name: "invoices",
    joinColumn: {
      name: "bookId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id"
    }
  })
  users: UserEntity[]
}
