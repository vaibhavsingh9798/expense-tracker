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

exports.signin = async (req,res)=>{
    const {email,password} = req.body;
    console.log('data..',email,password)
    try{
    let user = await User.findOne({where:{email:email}})
    console.log('user...',user)
    if(user === null ){
      console.log('not exist..')
      res.status(404).json({success:false,meassage:"The email address you entered isn't connected to an account."}) 
    }
    else{
    console.log('exist..',user.password)
    if(password === user.password)
    res.status(200).json({success:true,meassage:"You are successfully logged in"}) 
    else{
    res.status(401).json({success:false,meassage:"Incorrect password"}) 
    }

    }
  }
  catch(e){
      console.log('er',e)
  }
  }