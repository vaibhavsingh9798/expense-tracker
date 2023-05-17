console.log('js file')

let signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit',singnupFormSubmit)


function singnupFormSubmit(e){
    e.preventDefault();
    let name = document.getElementById('name').value 
    let email = document.getElementById('email').value 
    let password = document.getElementById('password').value 
    let user = {name,email,password}
    signup(user)
     document.getElementById('name').value =""
     document.getElementById('email').value =""
     document.getElementById('password').value =""
}



const signup = async (user)=>{
    console.log('signup call')
    const resp = await axios.post('http://localhost:3001/user/signup',user)
    console.log('resp',resp)
    if(resp.data.msg == 'exist'){
        let div = document.getElementById('errmsg')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode('User already exist'))
        document.getElementById('errmsg').style.color = 'red'
        div.appendChild(p)
    }
    else{
        let div = document.getElementById('errmsg')
        div.innerHTML=''
    }
}

