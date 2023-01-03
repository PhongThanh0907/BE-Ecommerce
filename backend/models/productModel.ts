import { model } from "mongoose";
import productSchema, { IProductSchema } from "../schemas/productSchema";

const ProductModel = model<IProductSchema>("Product", productSchema);

export default ProductModel;