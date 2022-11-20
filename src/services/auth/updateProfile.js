const router = require("express").Router()
const checkAuth = require("../../middleware/checkAuth")

const User = require("../../models/User")

router.post("/updateProfile/:email/:firstname/:lastname/:phone/:country/:state/:lga/:address", checkAuth, async(req, res) => {
    const { email, firstname, lastname, phone, country, state, lga, address } = req.params

    try {
        let user = await User.updateOne({ email }, { $set: { firstname, lastname, phone, country, state, lga, address } })
        return res.status(200).json({
            message: "User found",
            success: true,
            user
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Auth failed",
            error,
        })
    }
})

module.exports = router