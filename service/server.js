import express from "express";
import dotenv from "dotenv";
import initialize from "./app.js";

import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.secret_stripe_key);

const app = express();
const port = process.env.PORT || 3000;

initialize(app);

// Endpoint to create a payment intent
app.post("/api/payment/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
