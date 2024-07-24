const asyncWrapper = require("../middlewares/async");
const Product = require("../models/productModel");

const getAllProducts = asyncWrapper(async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };
    const regex = /\b(<|<=|=|>|>=)\b/g;

    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    const numericOptions = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (numericOptions.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;

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
