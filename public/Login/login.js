

let loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit',loginFormSubmit)

function loginFormSubmit(e){
    e.preventDefault();
    let email = document.getElementById('email').value 
    let password = document.getElementById('password').value 
    let user = {email,password} 
     login(user)
     document.getElementById('email').value =""
    document.getElementById('password').value =""
}

const login = async (user)=>{
    console.log('login call')
    let err = document.getElementById('err-msg')
    err.innerHTML=''
    let success = true;
    let errMsg = ''
    let token;
    try{
    const resp = await axios.post('http://16.171.147.248:3001/user/signin',user)
    console.log('resp....',resp)
    token = resp.data.token
    }
    catch(error){
        // console.error('err',error)
       success = error.response.data.success
       errMsg = error.response.data.meassage
    }
    if(!success){
        let err = document.getElementById('err-msg')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(`${errMsg}`))
        document.getElementById('err-msg').style.color = 'red'
        err.appendChild(p)
    }
    else{
      alert('You are successfully logged in')
      localStorage.setItem('token',token)
    //   location.assign('file:///D:/expense_tracker/public/Expense/expense.html')
      location.assign('http://16.171.147.248:3001/Expense/expense.html')
    }
}