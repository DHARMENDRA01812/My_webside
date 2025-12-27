const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Credit', 'Debit'], required: true }, // Credit = आय, Debit = निकासी
    description: { type: String, required: true }, // e.g., "Commission from Order #123"
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    date: { type: Date, default: Date.now }
});

const walletSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 0.0 }, // करंट बैलेंस
    totalEarned: { type: Number, default: 0.0 }, // अब तक की कुल कमाई
    transactions: [transactionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);