import { Invoice } from './invoice.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username'})
  username: string;

  @Column({ name: 'password'})
  password: string;

  @Column({ name: 'refreshToken'})
  refreshToken: string;

  @OneToMany(() => Invoice, invoice => invoice.userId)
  invoices: Invoice[];
}
