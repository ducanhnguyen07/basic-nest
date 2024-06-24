import { Expose, Transform } from 'class-transformer';
import { IsNumber } from "class-validator";

export class CreateInvoiceDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose({ name: 'userId' })
  @IsNumber()
  userId: number;

  @Expose({ name: 'bookId' })
  @IsNumber()
  bookId: number;
}
