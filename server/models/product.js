const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new Schema({
    product_name : {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref : "category",
        required: true
    },
    product_description : {
        type: String,
        required: false
    },
    product_price: {
        type: Number,
        required: false
    },
    status:{
        type: String,
        required: false
    }
},{
    timestamps: { createdAt: true, updatedAt: true }
})

productSchema.plugin(aggregatePaginate);

const product = mongoose.model("products", productSchema);
module.exports = product;
