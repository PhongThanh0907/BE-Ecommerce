import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/db";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/errorMiddleWare";

import userRoute from './routes/user.route'

import productRoute from './routes/product.route'

connectDB()

const app = express();

app.use(cors());

app.use(express.json());

app.use(errorHandler);

app.use('/api/users', userRoute)

app.use('/api/products', productRoute)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));