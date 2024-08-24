const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const auth = require("../middlewares/auth");

// Create a new material
router.post(
  "/transaction/initiate",
  auth,
  transactionController.initiateTransaction
);

// Get material(s)
router.post(
  "/transaction/complete",
  auth,
  transactionController.completeTransaction
);

router.get(
  "/getPaymentGatewayCredentails",
  // auth,
  (req, res) => {
    const merchantCode = process.env.MERCHANT_CODE;
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const consumerId = process.env.CONSUMER_ID;
    const txnId = process.env.TXN_ID;

    res.status(200).json({
      merchantCode,
      encryptionKey,
      consumerId,
      txnId,
    });
  }
);

module.exports = router;
