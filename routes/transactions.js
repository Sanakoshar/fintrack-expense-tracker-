const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

// Sab routes protected: login zaroori
router.use(protect);

router.route('/').get(getTransactions).post(addTransaction);

router.route('/:id').delete(deleteTransaction);

module.exports = router;
