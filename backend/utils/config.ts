import "dotenv/config";

export const MONGO_URL = process.env.MONGODB_URL || "";

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PORT = process.env.PORT || 6000;

export const TOKEN_SECRET = process.env.TOKEN_SECRET_KEY || "";
