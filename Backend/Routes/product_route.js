const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        if (req.query.gender && (req.query.gender === 'male' || req.query.gender === 'female')) {
            filter.gender = req.query.gender;
        }
        if(req.query.arrival) {
            filter.arrival = {$gte: req.query.arrival};
        }
        if(req.query.rating) {
            filter.rating = { $gte: req.query.rating };
        }
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { title: searchRegex },
                { category: searchRegex },
                { brand: searchRegex}
                // Add more fields to search from if needed
            ];
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