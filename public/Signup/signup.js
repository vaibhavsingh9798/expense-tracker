let signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit',signupFormSubmit)
console.log('load...')
function signupFormSubmit(e){
    e.preventDefault();
    let name = document.getElementById('name').value 
    let email = document.getElementById('email').value 
    let password = document.getElementById('password').value 
    let user = {name,email,password}
    console.log('get data',user)
    signup(user)
     document.getElementById('name').value =""
     document.getElementById('email').value =""
     document.getElementById('password').value =""

}


const signup = async (user)=>{
     let err = document.getElementById('err-msg')
          err.innerHTML=''
     let success = true;
     let errMsg = ''
    console.log('signup call with',user)
    try{
    const resp = await axios.post('http://16.171.147.248:3001/user/signup',user)
    console.log('resp',resp)
    }catch(error){ 
       success = error.response.data.sucsess
       errMsg = error.response.data.message
      console.error('e',error)
    }
    if(!success){
      console.log('!success block')
        let err = document.getElementById('err-msg')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(`${errMsg}`))
        document.getElementById('err-msg').style.color = 'red'
        err.appendChild(p)
    }else{
        alert('Signup successful!')
    }
}











