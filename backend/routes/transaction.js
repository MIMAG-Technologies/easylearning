const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");


router.post(
  "/transaction/make-transaction",
  transactionController.makeTransaction
);
router.post(
  "/transaction/sendMails",
  transactionController.sendTransactionEmail
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
