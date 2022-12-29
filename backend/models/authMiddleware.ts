import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/tokenService";
import { getUserById } from "../services/userService";
import { UserType } from "../types/userType";
import HttpException from "../utils/httpException";
const asyncHandler = require("express-async-handler");

export interface GetUserAuthInfoRequest extends Request {
  user: UserType;
}

export const protect = asyncHandler(
  async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization?.startsWith("Bearer ")
    ) {
      throw new HttpException("Unauthorized", 401);
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = await getUserById(decoded._id);
    next();
  }
);

export const verifyTokenAndAdmin = asyncHandler(
  async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    protect(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  }
);

