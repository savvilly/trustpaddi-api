const router = require("express").Router()
let crypto = require('crypto');

const Order = require('../../models/Order')
const Transaction = require('../../models/Transaction')

let secret = process.env.PAYSTACK_SECRET_KEY;

// Using Express

router.post("/webhook", async (req, res) => {

    //validate event

    let hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

    if (hash == req.headers['x-paystack-signature']) {

      // Retrieve the request's body

      const response = req.body;

      if(response.event === 'charge.success') {
        if (response.data.metadata.paymentForm === 'Order') {
          const reference = response.data.reference
          const order = await Order.findOne({ reference: reference })
          order.status = response.data.status
          await order.save()
          return
        }
        const reference = response.data.reference
        const tx = await Transaction.findOne({ reference: reference })
        tx.status = response.data.status
        return
      }
      // Do something with event
      console.log(response)

    }

    res.send(200);

});

module.exports = router