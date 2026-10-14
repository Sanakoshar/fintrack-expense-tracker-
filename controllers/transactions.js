const Transaction = require('../models/Transaction');

// @desc    Get all transactions (newest date first)
// @route   GET /api/v1/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, category, date } = req.body;
    const transaction = await Transaction.create({ text, amount, category, date });

    return res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    await Transaction.deleteOne({ _id: req.params.id });

    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};
