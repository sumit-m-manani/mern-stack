const Category = require('../models/category');
const mongoose = require('mongoose');

const createOne = async (req, res) => {
    const { category_name, category_description } = req.body;
    try {
        const insertElement = await Category.create({
            category_name: category_name,
            category_description: category_description
        })
        res.status(200).json(insertElement)
    } catch (error) {
        res.status(400).json({ error_1: error })
    }

}

const getAll = async (req, res) => {
    try {
        const getAll = await Category.find()
        res.status(200).json(getAll)
    } catch (error) {
        res.status(400).json({ error_2: error })
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error_3: "Invalid Id !!"})
        }

        const getById = await Category.findById(id)
        if(!getById){
            return res.status(404).json({error_4 : "No such Category found !!"}) 
        }

        res.status(200).json(getById)
    } catch (error) {
        res.status(400).json({ error_5: error })
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name, category_description } = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error_6: "Invalid Id !!"})
        }

        const updateElement = await Category.findOneAndUpdate({ _id : id }, {
            category_name: category_name,
            category_description: category_description
        }, { new : true })

        if(!updateElement){
            return res.status(404).json({error_8 : "Category not updated !!"}) 
        }

        res.status(200).json(updateElement)
    } catch (error) {
        res.status(400).json({ error_7: error })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error_9: "Invalid Id !!"})
        }

        const deleteElement = await Category.findOneAndDelete({ _id : id })
        if(!deleteElement){
            return res.status(404).json({error_10 : "No such Category found !!"}) 
        }

        res.status(200).json(deleteElement)
    } catch (error) {
        res.status(400).json({ error_11: error })
    }
}


module.exports = { createOne, getAll, getById, updateCategory, deleteCategory }