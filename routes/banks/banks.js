const router = require("express").Router()

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "All banks retrieved successfully",
        banks: [
            { id: 1, name: "Access Bank", abbreviation: "Access", code: "044" },
            { id: 2, name: "Citibank Nigeria", abbreviation: "CITI", code: "023" },
            { id: 3, name: "Access (Diamond) Bank", abbreviation: "Access (Diamond)", code: "063" },
            { id: 4, name: "Ecobank Nigeria", abbreviation: "ECO", code: "050" },
            { id: 5, name: "Fidelity Bank", abbreviation: "Fidelity", code: "070" },
            { id: 6, name: "First Bank of Nigeria", abbreviation: "FBN", code: "011" },
            { id: 7, name: "First City Monument Bank", abbreviation: "FCMB", code: "214" },
            { id: 8, name: "Guaranty Trust Bank", abbreviation: "GTB", code: "058" },
            { id: 9, name: "Heritage Bank", abbreviation: "Heritage", code: "030" },
            { id: 10, name: "Keystone Bank", abbreviation: "Keystone", code: "082" },
            { id: 11, name: "Polaris Bank", abbreviation: "Polaris", code: "076" },
            { id: 12, name: "Stanbic IBTC Bank", abbreviation: "Stanbic", code: "221" },
            { id: 13, name: "Standard Chartered Bank", abbreviation: "Standard CB", code: "068" },
            { id: 14, name: "Sterling Bank", abbreviation: "Sterling", code: "232" },
            { id: 15, name: "Suntrust Bank", abbreviation: "Suntrust", code: "000" },
            { id: 16, name: "Union Bank of Nigeria", abbreviation: "Union", code: "032" },
            { id: 17, name: "United Bank For Africa", abbreviation: "UBA", code: "033" },
            { id: 18, name: "Unity Bank", abbreviation: "Unity", code: "215" },
            { id: 19, name: "Wema Bank", abbreviation: "Wema", code: "035" },
            { id: 20, name: "Zenith Bank", abbreviation: "Zenith", code: "057" },
            { id: 21, name: "Enterprise Bank", abbreviation: "Enterprise", code: "084" },
            { id: 22, name: "MainStreet Bank", abbreviation: "MainStreet", code: "014" },
            { id: 23, name: "ALAT by WEMA", abbreviation: "ALAT", code: "035A" },
            { id: 24, name: "ASO Savings and Loans", abbreviation: "ASO Savings", code: "401" },
            { id: 25, name: "CEMCS Microfinance Bank", abbreviation: "CEMCS", code: "50823" },
            { id: 26, name: "Ekondo Microfinance Bank", abbreviation: "Ekondo", code: "562" },
            { id: 27, name: "Globus Bank", abbreviation: "Globus", code: "00103" },
            { id: 28, name: "Hasal Microfinance Bank", abbreviation: "Hasal", code: "50383" },
            { id: 29, name: "Jaiz Bank", abbreviation: "Jaiz", code: "301" },
            { id: 30, name: "Kuda Bank", abbreviation: "Kuda", code: "50211" },
            { id: 31, name: "Parallex Bank", abbreviation: "Parallex", code: "526" },
            { id: 32, name: "Providus Bank", abbreviation: "Providus", code: "101" },
            { id: 33, name: "Rubies MFB", abbreviation: "Rubies", code: "125" },
            { id: 34, name: "Sparkle Microfinance Bank", abbreviation: "Sparkle", code: "51310" },
            { id: 35, name: "TAJ Bank", abbreviation: "TAJ", code: "302" },
            { id: 36, name: "TCF MFB", abbreviation: "TCF", code: "51211" },
            { id: 37, name: "Titan Bank", abbreviation: "Titan", code: "102" },
            { id: 38, name: "VFD", abbreviation: "VFD Microfinance Bank", code: "566" }
        ]
    })
})

module.exports = router