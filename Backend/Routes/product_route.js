const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const productRoutes = express.Router();

const { ProductModel } = require("../Models/product_model");

//  search and sort functionality 
productRoutes.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skipIndex = (page-1) * limit;
        const sort = req.query.sortBy || '_id';
        const sortOrder = req.query.sortOrder || 'desc';


        const filter = {};
        if(req.query.title) {
            filter.title = req.query.title;
        }
        if(req.query.gender) {
            filter.title = req.query.gender;
        }
        if(req.query.arrival) {
            filter.arrival = {$gte: req.query.arrival};
        }
        if(req.query.rating) {
            filter.rating = { $gte: req.query.rating };
        }
        if(req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
        }
        const products = await ProductModel.find(filter).sort({ [sort]: sortOrder }).skip(skipIndex).limit(limit);
        return res.send(products)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

// get product by id
productRoutes.get("/:id", async (req, res) => {
    product = await ProductModel.findById({ _id: req.params.id })
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: "Product not found."});
    }

})


productRoutes.post("/add", async (req, res) => {
    const { title, gender, category, brand, rating, review, price, image, available, item_left } = req.body;
    try {
        product = ProductModel(req.body)
        await product.save();
        res.status(200).send({ "message": "One product has been added " })

    } catch (error) {

        console.log(error.message)
        res.status(404).send({ "message": error.message })
    }
})

module.exports = productRoutes;