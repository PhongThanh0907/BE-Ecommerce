import express from 'express'
import { createUserHandler, deleteUserHandler, getUserHandler, getUsersHandler, loginUserHandler, updateUserHandler } from '../controllers/user.controller';
import { protect, verifyTokenAndAdmin } from '../models/authMiddleware';

const router = express.Router();

router.get("/",verifyTokenAndAdmin, getUsersHandler);

router.get("/:id",protect, getUserHandler)

router.post("/" , createUserHandler)

router.delete("/:id",protect, deleteUserHandler)

router.put("/:id",protect, updateUserHandler)

router.post("/login", loginUserHandler)

export default router