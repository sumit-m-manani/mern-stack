const express = require('express');
const router = express.Router();
const {createOne, getAll, getById, updateCategory, deleteCategory} = require('../controller/category');

//POST a new category
router.post("/", createOne);

// GET all categories
router.get("/", getAll);


//GET a single category
router.get("/:id", getById);

//EDIT category
router.patch("/:id", updateCategory);

//DELETE category
router.delete("/:id", deleteCategory);

module.exports = router;