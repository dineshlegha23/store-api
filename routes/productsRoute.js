const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteAllProducts,
  deleteSingleProduct,
} = require("../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteAllProducts);

router.route("/:id").delete(deleteSingleProduct);

module.exports = router;
