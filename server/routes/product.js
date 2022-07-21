const express = require('express');
const router = express.Router();
const {createOne, getAll, getById, updateProduct, deleteProduct} = require('../controller/product');

//POST a new product
router.post("/", createOne);

// GET all products
router.get("/", getAll);

//GET a single product
router.get("/:id", getById);

//EDIT products
router.patch("/:id", updateProduct);

//DELETE products
router.delete("/:id", deleteProduct);

module.exports = router;