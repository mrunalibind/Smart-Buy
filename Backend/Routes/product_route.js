const express = require("express");

const productRoutes = express.Router();

const { ProductModel } = require("../Models/product_model");

//  search and sort functionality 
productRoutes.get("/", async (req, res) => {
    try {
        const { arrival } = req.query
        const { search } = req.query
        if (search) {
            const products = await ProductModel.find({ description: { $regex: search, $options: "i" } })
            if (products.length == 0) {
                return res.status(404).send({ "message": "no matched result found" })
            }
            return res.send(products)
        }
        if (arrival) {
            const products = await ProductModel.find().sort({ arrival: 1 })
            return res.send(products)
        }
        const products = await ProductModel.find()
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

productRoutes.post()

module.exports = {productRoutes}