const bodyParser = require("body-parser");

const stripeWebhookMiddleware = bodyParser.raw({ type: "application/json" });

module.exports = stripeWebhookMiddleware;
