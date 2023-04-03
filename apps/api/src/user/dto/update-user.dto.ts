import { USER_STATUS } from "../../schemas/enums/userStatus.enum";

export class UpdateUserDto {
    email?: string;
    password?: string;
    avatar?: string;
    status?: USER_STATUS;
    blockedUsers?: string[];
}
  