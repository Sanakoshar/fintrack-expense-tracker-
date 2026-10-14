Smart Expense Tracker - files ko apne project me same jagah copy karo (replace):

  models/Transaction.js
  controllers/transactions.js
  routes/transactions.js
  client/src/App.js
  client/src/Extra.css            (NEW)
  client/src/constants.js         (NEW)
  client/src/utils/format.js
  client/src/context/AppReducer.js
  client/src/context/GlobalState.js
  client/src/components/*.js      (Header, Balance, IncomeExpenses, Transaction,
                                   TransactionList, AddTransaction + NEW: Filters,
                                   CategoryChart, Budget)

config/db.js, server.js, config.env ko mat chhedna.
