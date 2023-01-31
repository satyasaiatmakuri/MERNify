const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
