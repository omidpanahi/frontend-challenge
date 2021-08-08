// @ts-ignore
import { createUser } from "sdk";
import { IUser } from "../models/User";
export interface ISignupResponse {
  user: IUser;
  token: string;
}
export function signUp(user: IUser): Promise<ISignupResponse> {
  return createUser(user);
}
