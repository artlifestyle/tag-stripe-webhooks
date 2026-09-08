const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(bodyParser.raw({ type: "application/json" }));

app.post("/stripe", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log("Payment succeeded event received");
  }

  res.json({ received: true });
});

// ⭐ THIS MUST EXIST ⭐
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

