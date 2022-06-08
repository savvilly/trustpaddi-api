const router = require("express").Router()
const checkAuth = require("../../middleware/checkAuth")

const SupportTicket = require("../../models/SupportTicket")

router.get("/getSingleTicket/:_id", checkAuth, async(req, res) => {
    const { user } = req.body
    const _id = req.params._id
    try {
        const tickets = await SupportTicket.find({ $and: [{ user }, { _id }] })
        if (tickets.length)
            res.status(200).json({
                tickets,
                success: true,
                message: "Fetch ticket successfully",
            })
    } catch (error) {
        return res.status(401).json({
            error,
            success: false,
            message: "Error geting ticket",
        })
    }
})

module.exports = router