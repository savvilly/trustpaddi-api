const router = require("express").Router()
const cloudinary = require("../../middleware/cloud")
const upload = require("../../middleware/multer")
const checkAuth = require("../../middleware/checkAuth")

const Transaction = require("../../models/Transaction")

router.post("/createTransaction", upload.single("image"), checkAuth, async(req, res) => {
    const {
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
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: process.env.CLOUDINARY_FOLDER,
        })

        // Create payment with paystack
        const data = await initPay(recipientEmail, total, '')

        const transaction = await new Transaction({
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
            image: result.secure_url,
            reference: data.data.reference,
        })
        res.status(201).json({
            message: "Transaction successfully created",
            success: true,
            transaction,
            url: data.data.authorization_url
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "Error creating transaction. Please add an image",
            error,
        })
    }
})

module.exports = router