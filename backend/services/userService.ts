import bcrypt from "bcryptjs";

import { checkIsValidObjectId } from "../database/db";
import UserModel from "../models/userModel";
import { sanitizeLoginUser, sanitizeUser } from "../sanitizers/userSanitizer";
import { IUserSchema } from "../schemas/userSchema";
import { UserReturnType, UserType } from "../types/userType";
import HttpException from "../utils/httpException";
import { generateToken } from "./tokenService";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const users = await UserModel.find();
    if (!users) throw new HttpException("User not found", 404);
    return users;
  } catch (error) {
    throw new Error(`Failed to get users: ${error.message}`);
  }
};

export const getUserById = async (userId: string): Promise<IUserSchema> => {
  checkIsValidObjectId(userId);
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new HttpException("User not found", 404);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const createUser = async (user: UserType): Promise<UserReturnType> => {
  const sanitizedUser = await sanitizeUser(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);

  try {
    const newUser = await UserModel.create({
      userName: sanitizedUser.userName,
      email: sanitizedUser.email,
      password: hashedPassword,
      isAdmin: sanitizedUser.isAdmin,
    });

    if (!newUser) throw new HttpException("User not create", 400);

    return {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      }),
    };
  } catch (error) {
    throw new HttpException(`Failed to create user: ${error.message}`, 400);
  }
};

export const updateUser = async (
  userId: string,
  user: UserType
): Promise<IUserSchema> => {
  checkIsValidObjectId(userId);
  const sanitizedUser = await sanitizeUser(user);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizedUser, {
      new: true,
    });
    if (!updatedUser) throw new HttpException("User not found", 404);
    return updatedUser;
  } catch (error) {
    throw new HttpException(`Failed to update user: ${error.message}`, 400);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  checkIsValidObjectId(userId);
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) throw new HttpException("User not found", 404);
  } catch (error) {
    throw new HttpException(`Failed to deleted user: ${error.message}`, 400);
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserReturnType> => {
  const sanitizedUser = await sanitizeLoginUser(email, password);
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User is not found");

    const isPasswordValid = await bcrypt.compare(
      sanitizedUser.password,
      user.password
    );
    if (!isPasswordValid) throw new Error("Password is not correct");

    return {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
      }),
    };
  } catch (error) {
    throw new Error(`Failed to login user: ${error.message}`);
  }
};