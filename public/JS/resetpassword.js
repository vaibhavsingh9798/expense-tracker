let form = document.getElementById('fpassword');
form.addEventListener('submit',handlePassword)


let postMail = async (uemail)=>{
    console.log('post mail',uemail)
    let resp = axios.post('http://localhost:3001/password/forgotpassword',{uemail})
}
 
function handlePassword(e){
  e.preventDefault();
  console.log('clik12')
  let gmail = document.getElementById('email').value 
   postMail(gmail)
   document.getElementById('email').value =""
}