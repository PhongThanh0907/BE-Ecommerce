import { checkIsValidObjectId } from "../database/db";
import ProductModel from "../models/productModel";
import { IProductSchema } from "../schemas/productSchema";
import { ProductType } from "../types/productType";

export const getProducts = async ({
  searchText,
  type,
  max,
  brand,
  sort,
}: {
  searchText?: any;
  type?: any;
  max?: any;
  brand?: any;
  sort: any;
}): Promise<ProductType[]> => {
  const search: any = {};

  if (max) search.price = { $gt: 0, $lt: max };
  if (brand)
    search.brand = {
      $in: brand,
    };
  if (type)
    search.type = {
      $in: type,
    };

  let searchInput = {};

  if (searchText)
    searchInput = {
      $or: [
        { brand: { $regex: `${searchText}`, $options: "i" } },
        { nameProduct: { $regex: `${searchText}`, $options: "i" } },
        { type: { $regex: `${searchText}`, $options: "i" } },
      ],
    };

  const sortParams: any = {};
  if (sort) sortParams.price = sort;

  try {
    const products = await ProductModel.find(search)
      .find(searchInput)
      .sort(sortParams);
    if (!products) throw new Error("No products found");
    return products;
  } catch (error) {
    throw new Error("Error getting products");
  }
};

export const getProductById = async (
  productId: string
): Promise<IProductSchema> => {
  checkIsValidObjectId(productId);
  try {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Product is not found");
    return product;
  } catch (error) {
    throw new Error("Error getting product");
  }
};

export const createProduct = async (
  product: ProductType
): Promise<ProductType> => {
  try {
    const newProduct = await ProductModel.create(product);
    if (!newProduct) throw new Error("Product not created");
    return newProduct;
  } catch (error) {
    throw new Error("Product not created");
  }
};

export const updateProduct = async (
  productId: string,
  product: ProductType
): Promise<IProductSchema> => {
  checkIsValidObjectId(productId);
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      product,
      { new: true }
    );
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product");
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  checkIsValidObjectId(productId);
  try {
    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) throw new Error("Product not found");
  } catch (error) {
    throw new Error("Error deleting product");
  }
};
