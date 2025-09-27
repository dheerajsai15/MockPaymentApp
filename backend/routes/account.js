const express = require("express");
const authMiddleware = require("../middleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware,async (req,res) => {
    const account = await Accounts.findOne({
        userId: req.userId
    })

    return res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware,async (req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const fromUserId = req.userId;
    const toUserId = req.body.to;
    const amount = req.body.amount;
    console.log("from " + fromUserId)

    const account = await Accounts.findOne({
        userId: fromUserId
    })

    if(account.balance < amount){
        return res.status(400).json({
            message: "Insufficient Balance!"
        })
    }

    const toAccount = await Accounts.findOne({
        userId: toUserId
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Accounts.updateOne({
        userId: fromUserId
    }, {
        $inc: {
            balance: -amount
        }
    })

     await Accounts.updateOne({
        userId: toUserId
    }, {
        $inc: {
            balance: amount
        }
    })
    await session.commitTransaction();

    return res.json({
        message: "Transfer successful"
    })
})

module.exports = router;