import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateBookDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;
}
