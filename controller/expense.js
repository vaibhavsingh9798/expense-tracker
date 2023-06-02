const Expense = require('../model/expense')
const User = require('../model/user')
const sequelize = require('../util/database')
exports.getExpense = async (req,res) =>{
    console.log('req.user>>>>>>>>>>',req.user,req.user.ispremiumuser)
    console.log('req.user.id1....',req.user.id)
    let resp = await Expense.findAll({where:{userId:req.user.id}})
    res.status(200).json(resp)
}

exports.postExpense = async(req,res) =>{
  let t = await sequelize.transaction() // transaction();
  let new_total=0;
  const userId = req.user.id
    let {eamount,description,category} = req.body
 try{
  let resp = await  Expense.create({eamount,description,category,userId},{transaction:t})
    let existuser = await User.findOne({where:{id:userId}})
     let old_total = parseInt(existuser.totalexpense)
      new_total  = parseInt((old_total*1)+(eamount*1));
    let updateuser = await User.update({totalexpense:new_total},{where:{id:userId},transaction:t})
    await t.commit() // check both staisfy then update both db 
   res.status(201).json(resp)
 }
 catch(err){
  await t.rollback() // roallback mean does't update db
  res.status(500).json({success:false,meassage:err})
 }

}

exports.deleteExpense = async (req,res)=>{
    let expid = req.params.id
    let expenseDetails = await Expense.findOne({attributes:['eamount','userId'],where:{id:expid}})
    console.log('expD...',expenseDetails)
    let user = await User.findOne({where:{id:expenseDetails.userId}})
    let new_total = parseInt((user.totalexpense*1) - (expenseDetails.eamount*1))
    let updateUser = await User.update({totalexpense:new_total},{where:{id:expenseDetails.userId}})
    let resp = await Expense.destroy({where:{id:expid}})
    res.status(200).json(resp)
}

