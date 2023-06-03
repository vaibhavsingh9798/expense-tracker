const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config()
exports.postMail = async (req,res) =>{
    let {uemail} = req.body
     console.log('mail',uemail)
try{
  const client = SibApiV3Sdk.ApiClient.instance;
  // Configure API key authorization: api-key
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()
 
const sender = {
  email : 'singhvaibhav.mca@gmail.com'
}

const reciver = [
  {
 email : `${uemail}`
  }]

  let resopnse = await tranEmailApi.sendTransacEmail({
     sender,
     to:  reciver,
     subject:'Reset Password',
     textContent: 'Your new Password: Vs12'
  })

 console.log('response...',resopnse)

    }
catch(err){
    console.log(err)
}



}