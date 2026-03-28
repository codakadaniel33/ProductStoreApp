import dotenv from "dotenv";
import express from "express";
import { getAllProducts, createProducts, getProductsById, updateProducts, deleteProducts } from "../Controllers/productsController.js";

dotenv.config();

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductsById);

router.put("/products/update/:id", updateProducts);

router.delete("/products/delete/:id", deleteProducts);

router.post("/products/create", createProducts);

export default router;