import { model } from "mongoose";
import userSchema, { IUserSchema } from "../schemas/userSchema";

const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;