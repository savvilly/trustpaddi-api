const router = require("express").Router()
const checkAuth = require("../../middleware/checkAuth")

const Bank = require("../../models/Banks")

router.post("/resolveBank/:user/:bankId/:accountNumber", checkAuth, (req, res) => {
    const { user, bankId, accountNumber } = req.params

    Bank.updateOne({ $and: [{ bankId }, { accountNumber }, { user }] }, { $set: { resolve: true } })
        .exec()
        .then(bank => {
            Bank.findOne({ $and: [{ user }, { bankId }, { accountNumber }] })
                .then((bank) => {
                    return res.status(200).json({
                        message: "Bank resolved",
                        success: true,
                        bank,
                    })
                }).catch((error) => {
                    return res.status(401).json({
                        error,
                    })
                })
        })
        .catch((error) => {
            return res.status(401).json({
                error,
            })
        })
})

module.exports = router