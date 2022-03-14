import { IUser } from "./user.interface";

export interface ITheme {
    themeName: string,
    created_at: string,
    subscribers: string[],
    userId: IUser
}