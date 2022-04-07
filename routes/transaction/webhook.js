const router = require("express").Router()
let crypto = require('crypto');

let secret = process.env.PAYSTACK_SECRET_KEY;

// Using Express

router.post("/webhook", function(req, res) {

    //validate event

    let hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

    if (hash == req.headers['x-paystack-signature']) {

    // Retrieve the request's body

    let event = req.body;

    // Do something with event  
    console.log(event)

    }

    res.send(200);

});

module.exports = router