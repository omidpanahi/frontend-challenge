// @ts-ignore
import { createUser } from "sdk";
import { IAccount } from "../models/Account";
import { IUser } from "../models/User";

export function signUp(user: IUser): IAccount {
  return createUser(user);
}
