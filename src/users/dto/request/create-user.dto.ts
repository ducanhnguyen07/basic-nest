import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { IsName } from "src/decorator/name.decorator";

export class CreateUserDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  @IsName()
  username: string;

  @Expose()
  @IsString()
  password: string;
}
