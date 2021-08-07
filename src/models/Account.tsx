import { IUser } from "./User";

export interface IAccount {
    user: IUser;
    token: string;
}