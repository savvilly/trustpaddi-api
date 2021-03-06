const router = require("express").Router()
const checkAuth = require("../../middleware/checkAuth")

const Product = require("../../models/Product")

router.get("/getSingleProduct/:_id", async(req, res) => {
    const _id = req.params._id
    try {
        const product = await Product.find({
            _id,
        })
        if (product.length)
            res.status(200).json({
                product,
                success: true,
                message: "Fetched product successfully",
            })
    } catch (error) {
        return res.status(401).json({
            error,
            success: false,
            message: "Error geting product",
        })
    }
})

module.exports = router