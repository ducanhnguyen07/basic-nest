import { CreateUserDto } from "./dto/request/create-user.dto";

export class UserMockService {
  createUser = (user: CreateUserDto): any => {
    return {
      id: 3,
      username: "mock name"
    };
  }
}