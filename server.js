const express = require('express');
const paypal = require('paypal-rest-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

paypal.configure({
  'mode': 'live', // switched from 'sandbox' to 'live'
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// Create payment
app.post('/api/paypal/create-payment', (req, res) => {
  const { amount } = req.body;
  const create_payment_json = {
    "intent": "sale",
    "payer": { "payment_method": "paypal" },
    "redirect_urls": {
      "return_url": "https://starteady.com/success", // TODO: Set your real domain
      "cancel_url": "https://starteady.com/cancel"   // TODO: Set your real domain 
    },
    "transactions": [{
      "amount": { "currency": "USD", "total": amount },
      "description": "Starteady Service"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json({ id: payment.id, links: payment.links });
    }
  });
});

// Capture payment (after user approves)
app.post('/api/paypal/execute-payment', (req, res) => {
  const { paymentId, payerId } = req.body;
  const execute_payment_json = { "payer_id": payerId };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json({ payment });
    }
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));