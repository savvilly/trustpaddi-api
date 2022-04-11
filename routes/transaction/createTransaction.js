const router = require("express").Router()
const cloudinary = require("../../middleware/cloud")
const upload = require("../../middleware/multer")
const mongoose = require("mongoose")
const checkAuth = require("../../middleware/checkAuth")

const Transaction = require("../../models/Transaction")

const { initPay } = require('../../paystack')

router.post("/createTransaction", checkAuth, async(req, res, next) => {
    let {
        user,
        recipientName,
        recipientEmail,
        recipientPhone,
        transactionType,
        price,
        quantity,
        role,
        description,
        duration,
    } = req.body

    if(!quantity) quantity = 1

    let charge = (20 / 100) * price
    let total = Number(charge) + Number(price)
    total = total * quantity
    try {
        
        // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: process.env.CLOUDINARY_FOLDER,
        // })
            
        let _id = new mongoose.Types.ObjectId()
        // Create payment with paystack
        const metadata = {
					paymentForm: 'Transaction',
					txId: _id,
					userId: user,
					role: role,
					transactionType: transactionType
        }
        const data = await initPay(recipientEmail, total, '', metadata)

        const transaction = await new Transaction({
            _id,
            user,
            recipientName,
            recipientEmail,
            recipientPhone,
            transactionType,
            price,
            quantity,
            role,
            description,
            duration,
            charge,
            total,
            image: 'result.secure_url',
            reference: data.data.reference,
        })
        res.status(201).json({
            message: "Transaction successfully created",
            success: true,
            transaction,
            url: data.data.authorization_url
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router