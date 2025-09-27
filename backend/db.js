const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URL}/paytm`)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User', userSchema)

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, required: true }
})

const Accounts = mongoose.model("Accounts",accountSchema)

module.exports = {
    User,
    Accounts
}