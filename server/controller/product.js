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

        const searchKeyword = req.query.keyword || "";
        console.log("Query : ", req.query)

        let facetOptions = {
            data: []
        };
        if (req.query.page && req.query.limit) {
            const options = {
                page: Number(req.query.page || 1),
                limit: Number(req.query.limit || 2),
                offset: 0,
            };
            options.offset = (options.page - 1) * options.limit;

            facetOptions = {
                metadata: [
                    {
                        $count: "itemCount",
                    },
                    {
                        $addFields: {
                            page: options.page,
                            limit: options.limit
                        }
                    }
                ],
                data: [{ $skip: options.offset }, { $limit: options.limit }]
            }
        }


        let matchConditions = {};

        if(req.query.hasOwnProperty('keyword')){
            let keyword = { $regex: '.*' + searchKeyword + '.*', $options: 'i' };
            let orCondition = [
                { product_name: keyword },
                { 'category.category_name': keyword },
                { status: keyword },
            ]
            matchConditions['$or'] = orCondition;
        }

        let sortOrder = { createdAt: -1 }
        if (req.query.hasOwnProperty('order_by')) {
            sortOrder = {}
            if (req.query.order_by === 'category_name') {
                sortOrder['category.category_name'] = req.query.order == "asc" ? 1 : -1;
            }
            if (req.query.order_by === 'product_name') {
                sortOrder['productToLower'] = req.query.order == "asc" ? 1 : -1;
            }
            if (req.query.hasOwnProperty("order")) {
                let order = req.query.order == "asc" ? 1 : -1
                let orderBy = req.query.order_by
                sortOrder[orderBy] = order;
            }
            console.log("sortOrder : ", sortOrder)
        }

        let getAll = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category',
                }
            },
            {
                $match: matchConditions
            },
            {
                $sort: sortOrder
            },
            {
                $addFields: {
                    category: { $arrayElemAt: ["$category", 0] },
                    price: { $toString: "$product_price" },
                    productToLower : { $toLower: '$product_name'}
                }
            },
        ]);

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