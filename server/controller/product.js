const Product = require('../models/product');
const mongoose = require('mongoose');

const createOne = async (req, res) => {
    const { product_name, category_id, product_description, product_price, status } = req.body;
    try {
        const insertElement = await Product.create({
            product_name : product_name,
            category_id : category_id,
            product_description : product_description,
            product_price : product_price,
            status : status
        })
        res.status(200).json(insertElement)
    } catch (error) {
        res.status(400).json({ error_1: error })
    }

}

const getAll = async (req, res) => {
    try {
        const getAll = await Product.find()
        res.status(200).json(getAll)
    } catch (error) {
        res.status(400).json({ error_2: error })
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.statsus(400).json({error_33: "Invalid Id !!"})
        }

        const getById = await Product.findById(id)
        if(!getById){
            return res.status(404).json({error_4 : "No such Product found !!"}) 
        }

        res.status(200).json(getById)
    } catch (error) {
        res.status(400).json({ error_5: error })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, category_id, product_description, product_price, status } = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error_6: "Invalid Id !!"})
        }

        const updateElement = await Product.findOneAndUpdate({ _id : id }, {
            product_name : product_name,
            category_id : category_id,
            product_description : product_description,
            product_price : product_price,
            status : status
        }, { new : true })

        if(!updateElement){
            return res.status(404).json({error_7 : "Product not updated !!"}) 
        }

        res.status(200).json(updateElement)
    } catch (error) {
        res.status(400).json({ error_8: error })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error_9: "Invalid Id !!"})
        }

        const deleteElement = await Product.findOneAndDelete({ _id : id })
        if(!deleteElement){
            return res.status(404).json({error_10 : "No such Product found !!"}) 
        }

        res.status(200).json(deleteElement)
    } catch (error) {
        res.status(400).json({ error_11: error })
    }
}


module.exports = { createOne, getAll, getById, updateProduct, deleteProduct }