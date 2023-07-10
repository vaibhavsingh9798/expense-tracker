let form = document.getElementById('fpassword');
form.addEventListener('submit',handlePassword)


let postMail = async (uemail)=>{
   // console.log('post mail',uemail)
   try{
    let resp = await axios.post('http://16.171.147.248:3001/password/forgotpassword',{uemail})
  }catch(error){
    console.error('error',error)
}
}
 
function handlePassword(e){
  e.preventDefault();
 // console.log('clik12')
  let gmail = document.getElementById('email').value 
   postMail(gmail)
   document.getElementById('email').value =""
}