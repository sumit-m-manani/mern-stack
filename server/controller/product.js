const createOne = (req, res) => {
    res.json({mssg : "Insert new products into database"})
}

const getAll = (req, res) => {
    res.json({mssg : "Get all products from database"})
}

const getById = (req, res) => {
    res.json({mssg : "Get a single from database"})
}

const updateProduct = (req, res) => {
    res.json({mssg : "Update products into database"})
}

const deleteProduct = (req, res) => {
    res.json({mssg : "Delete a product from database"})
}


module.exports = { createOne, getAll, getById, updateProduct, deleteProduct }