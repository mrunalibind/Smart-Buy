const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },

    availability: { type: Boolean, default: true },
    item_left: { type: Number },

    desc: { type: String },
    arrival: { type: Date}
}, {
    versionKey: false
})

const ProductModel = mongoose.model('product', productSchema);

module.exports = { ProductModel };