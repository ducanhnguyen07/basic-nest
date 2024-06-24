import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name'})
  name: string;

  @Column({ name: 'description'})
  description: string;

  @Column({ name: 'fee', type: 'decimal' })
  fee: number;
}
