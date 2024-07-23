const asyncWrapper = require("../middlewares/async");
const Product = require("../models/productModel");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ status: "success", total: products.length, products });
});

const createProduct = asyncWrapper(async (req, res) => {
  const { name, price, company } = req.body;
  const product = await Product.create({ name, price, company });
  res.status(201).json({ status: "success", product });
});

const deleteAllProducts = asyncWrapper(async (req, res) => {
  await Product.deleteMany({});
  res.status(204).json();
});

const deleteSingleProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json();
});

module.exports = {
  getAllProducts,
  createProduct,
  deleteAllProducts,
  deleteSingleProduct,
};
