import Product from "../models/product.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error while fetching!" });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;
  console.log(product);

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "you forgot to fill some fields." });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product " });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted!" });
  } catch (e) {
    res.status(404).json({ success: false, error: "cant find a product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product " });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (e) {
    res.status(500).json({ success: false, error: "server error" });
  }
};
