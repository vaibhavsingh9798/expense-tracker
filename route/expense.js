const express = require('express')
const expenseController = require('../controller/expense')

const router = express.Router()

router.get('/allexpenses',expenseController.getExpense)

router.post('/addexpense',expenseController.postExpense)

module.exports = router;