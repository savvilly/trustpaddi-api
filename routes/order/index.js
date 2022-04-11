const router = require("express").Router()
const mongoose = require("mongoose")
const Order = require("../../models/Order")
const Product = require("../../models/Product")
const User = require("../../models/User")

const { initPay } = require('../../paystack')

router.post("/create-order", async(req, res, next) => {
    let {
      productId,
      buyerEmail,
      buyerPhone,
      sellerId,
      quantity
    } = req.body

    if(!quantity) quantity = 1
    try {
      if(!buyerEmail || !buyerPhone) throw new Error('Added buyers details')
      const product = await Product.findById(productId)
      if (!product) {
        const error = new Error('No product found')
        error.statusCode = 401
        throw error
      }

      const user = await User.findById(sellerId)

      if (!user) {
        const error = new Error('No user found')
        error.statusCode = 401
        throw error
      }
      
      let price = product.price
      price = price * quantity
      let charge = (20 / 100) * price
      let totalCost = Number(charge) + Number(price)

      let _id = new mongoose.Types.ObjectId()

        // Create payment with paystack
        const metadata = {
					paymentForm: 'Order',
					orderId: _id,
          productId: productId,
					sellerId: sellerId,
					buyerEmail: buyerEmail,
        }
        const data = await initPay(buyerEmail, totalCost, '', metadata)

        const order = await new Order({
          _id,
          productId,
          buyerEmail,
          buyerPhone,
          sellerId,
          totalCost,
          quantity,
          price,
          charge,
          reference: data.data.reference,
        })
        res.status(201).json({
            message: "Order successfully created",
            success: true,
            order,
            url: data.data.authorization_url
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router