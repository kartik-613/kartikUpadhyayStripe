const express = require('express');
const mainRouter = express.Router();
const {
  createCheckoutSession,
  handleWebhook,
} = require('../controllers/stripeController');
const stripeWebhookMiddleware = require('../middlewares/stripeWebhook');

mainRouter.post('/stripe/webhook', stripeWebhookMiddleware, handleWebhook);

mainRouter.post('/stripe/create-checkout-session', createCheckoutSession);

module.exports = mainRouter;
