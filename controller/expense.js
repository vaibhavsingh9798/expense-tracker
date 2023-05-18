const Expense = require('../model/expense')

exports.getExpense = async (req,res) =>{
    let resp = await Expense.findAll()

    res.status(200).json(resp)
}

exports.postExpense = async(req,res) =>{
    let {eamount,description,category} = req.body

  let resp = await  Expense.create({eamount,description,category})
   res.status(201).json(resp)

}