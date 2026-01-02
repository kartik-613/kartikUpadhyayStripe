const Stripe = require('stripe');
const dotenv = require('dotenv');
const Order = require('../models/Order');
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing in your .env file!');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, email } = req.body;

    if (!cartItems || !email) {
      return res.status(400).json({ error: 'Missing cart items or email' });
    }

    const order = await Order.create({
      customerEmail: email,
      items: cartItems,

    });

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items,
      metadata: { orderId: order._id.toString() },
      success_url:
        'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    order.transactionId = session.id;
    await order.save();

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Stripe checkout failed' });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).send('STRIPE_WEBHOOK_SECRET missing!');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send('Webhook Error');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await Order.findByIdAndUpdate(session.metadata.orderId, {
      paymentStatus: 'success',
    });

  }

  res.json({ received: true });
};
