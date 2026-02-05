import { UserResponse } from "./user-response.interface";

export interface UserAccessToken {
  status: boolean;
  accessToken: string;
  user: UserResponse;
}
