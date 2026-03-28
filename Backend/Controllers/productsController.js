import pool from "../Config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        
        if (result.rows.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Products found successfully!",
                data: result.rows
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No products found!",
                data: []
            });
        }
    } catch (error) {
        console.error("Error in getAllProducts:", error.message);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({  
                message: "Product ID is required",
                success: false,
                data: null
            });
        }

        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING *", 
            [id]
        );
        if (result.rows.length > 0) {
            return res.status(200).json({  
                message: "Product deleted successfully!",
                success: true,
                data: result.rows[0]
            });
        } else {
            return res.status(404).json({  
                message: "Product not found",
                success: false
            });
        }
    } catch (error) {
        console.error("Error in deleteProducts:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const createProducts = async (req, res) => {
    try {
        const { name, price, description, picture} = req.body;  

        if (!name || !price || !description || !picture) {
            return res.status(400).json({  
                message: "All fields (name, price, description, picture) are required",
                success: false
            });
        }

       
        const result = await pool.query(
            "INSERT INTO products (name, price, description, picture) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, price, description, picture]
        );

        if (result.rows.length > 0) {
            return res.status(201).json({
                message: "Product created successfully!",
                success: true,
                data: result.rows[0]
            });
        } else {
            return res.status(400).json({
                message: "Error creating product",
                success: false
            });
        }
    } catch (error) {
        console.error("Error in createProducts:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};


export const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }
        
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [id]
        );
        
        if (result.rows.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Product found successfully!",
                data: result.rows[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        console.error("Error in getProductsById:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, picture } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }
        
        const result = await pool.query(
            "UPDATE products SET name = $1, price = $2, description = $3, picture = $4 WHERE id = $5 RETURNING *",
            [name, price, description, picture, id]
        );
        
        if (result.rows.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result.rows[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        console.error("Error in updateProducts:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};