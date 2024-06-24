import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateUserResponseDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  username: string;
}
