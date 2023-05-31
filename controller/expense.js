const Expense = require('../model/expense')
let userId;
exports.getExpense = async (req,res) =>{
    userId = req.user.id
    console.log('req.user>>>>>>>>>>',req.user,req.user.ispremiumuser)
    console.log('req.user.id1....',req.user.id)
    let resp = await Expense.findAll({where:{userId:req.user.id}})
    res.status(200).json(resp)
}

exports.postExpense = async(req,res) =>{
    console.log('userId',userId)
    let {eamount,description,category} = req.body

  let resp = await  Expense.create({eamount,description,category,userId})
   res.status(201).json(resp)

}

exports.deleteExpense = async (req,res)=>{
    let eid = req.params.id
  console.log('eid',eid)
    let resp = await Expense.destroy({where:{id:eid}})
    res.json(resp)
}

