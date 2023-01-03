import { Schema } from "mongoose";
import { ProductType } from "../types/productType";
export interface IProductSchema extends ProductType {
  _id: string;
}

const productSchema = new Schema<ProductType>(
  {
    nameProduct: {
      type: String,
      require: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },

    imageProduct: {
      type: [String],
      require: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    oldPrice: {
      type: Number
    }
  },
  { timestamps: true }
);

export default productSchema;
