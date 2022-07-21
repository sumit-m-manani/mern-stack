const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category_name : {
        type: String,
        required: true
    },
    category_description : {
        type: String
    }
},{
    timestamps: { createdAt: true, updatedAt: true }
})

const category = mongoose.model("category", categorySchema);
module.exports = category;