const User = require('../model/user')

exports.signup = async (req,res)=>{
  const {name,email,password} = req.body;
  console.log('data..',name,email,password)
  try{
  let user = await User.findOne({where:{email:email}})
  if(user === null){
    console.log('not exist..')
    let response = await User.create({name,email,password})
    res.json(response)
  }
  else{
  console.log('exist..')
  res.json({msg:"exist"})
  }
}
catch(e){
    console.log('er',e)
}
}