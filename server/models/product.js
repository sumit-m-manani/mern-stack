const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const product = mongoose.model("product", productSchema);
module.exports = product;
