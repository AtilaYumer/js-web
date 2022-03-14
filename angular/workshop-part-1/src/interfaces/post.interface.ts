import { ITheme } from "./theme.interface";
import { IUser } from "./user.interface";

export interface IPost {
    themeId: ITheme,
    userId: IUser,
    created_at: string
}