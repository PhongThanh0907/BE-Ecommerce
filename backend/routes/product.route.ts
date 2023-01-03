import express from 'express'

const router = express.Router();

import {getProductsHandler ,getProductHandler, createProductHandler, deleteProductHandler, updateProductHandler } from '../controllers/productControllers'

router.get("/", getProductsHandler);

router.get("/:id", getProductHandler)

router.post("/" , createProductHandler)

router.delete("/:id", deleteProductHandler)

router.put("/:id", updateProductHandler)

export default router