// const Razorpay = require("razorpay")
let ispremiumuser;
let expenseForm = document.getElementById('expenseForm')
expenseForm.addEventListener('submit',submitForm)
let ul = document.getElementById('expenses')
ul.addEventListener('click',delItem)
let token = localStorage.getItem('token')
function submitForm(e){
    e.preventDefault()
    let eamount = document.getElementById('eamount').value 
    let description = document.getElementById('description').value
    let category = document.getElementById('category').value
     const expense = {eamount,description,category}
     console.log('exp',expense)
    postExpense(expense)
}

function printExpense(item){
    let ul = document.getElementById('expenses')
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item m-1')
    li.appendChild(document.createTextNode(`${item.eamount} - ${item.description} - ${item.category}`))
    let delBtn = document.createElement('button')
    delBtn.appendChild(document.createTextNode('Delete'))
    delBtn.setAttribute('class','del float-right')
    delBtn.setAttribute('id',item.id)
    li.appendChild(delBtn)
    ul.appendChild(li)
}

function addButton(premimum){
    let btn = document.getElementById('rzp-button')
    btn.innerHTML=""
    if(premimum){ 
         btn.appendChild(document.createTextNode('Premium User'))
        }else{
            btn.appendChild(document.createTextNode('Buy Premium Membership'))
        }
}

let lb = document.getElementById('leaderboard')
async function printLeaderBoard(user){
// LEADERBOARD
 document.getElementById('lb-title').innerHTML="LEADERBOARD"
 let li = document.createElement('li')
 li.appendChild(document.createTextNode(`Name - ${user.name} Total Expense - ${user.texpense}`))
 lb.appendChild(li)
}
    
function addLeadeboard(premium){
    let btn = document.createElement('button')
    btn.appendChild(document.createTextNode('Leaderboard'))
    btn.setAttribute('class','float-right m-1 p-1')
    let div = document.getElementById('rzp-lb')
    if(premium)
    div.appendChild(btn).onclick = async function(){
        console.log('click....')
        let users = await axios.get(`http://localhost:3001/premium/showLeaderBoard`)
        console.log('users..',users)
        users.data.map(user => printLeaderBoard(user))
    }


 }

const getExpense = async () =>{
    console.log('get call token',token)
   
    let ul = document.getElementById('expenses')
    ul.innerHTML=''
   let resp = await axios.get('http://localhost:3001/expense/allexpenses',{headers:{"Authorization":token}})
    let response = await axios.get('http://localhost:3001/purchase/usercategory',{headers:{"Authorization":token}})
   const usercategory = response.data
   ispremiumuser = response.data
   console.log('usercategory>>>>>>>',usercategory) 
   addButton(usercategory) 
   addLeadeboard(usercategory)                 
  // print(item)
  console.log('get resp',resp.data)
  resp.data.map((item)=> printExpense(item))
}

const postExpense = async (expense) => {
    let resp = await axios.post('http://localhost:3001/expense/addexpense',expense)
    console.log('post resp',resp)
    getExpense()
}

const deleteExpense = async (id)=>{
    let resp = await axios.delete(`http://localhost:3001/expense/deleteexpense/${id}`)
    getExpense()
}

function delItem(e){
    console.log('del call')
    if(e.target.getAttribute('class') == 'del float-right')
    {
        let id = e.target.getAttribute('id')
        console.log('id',id)
        deleteExpense(id)
    }
}

window.addEventListener('DOMContentLoaded',getExpense)
 
document.getElementById('rzp-button').onclick = async function(e){
   
    let token = localStorage.getItem('token')
    console.log('rzp-click',token)
    if(!ispremiumuser){
    let response = await axios.get(`http://localhost:3001/purchase/premiummembership`,{headers:{"Authorization":token}})
  console.log('resp44',response)

  var options = {
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler": async function(response){
        await axios.post(`http://localhost:3001/purchase/updatetransactionstatus`,{
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        success:true
        },{headers:{"Authorization":token}})

        alert('You are a Premium User Now')
        addButton(true)
        addLeadeboard(true)
    }

  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  
  rzp1.on('payment.failed',async function(response){
    await axios.post(`http://localhost:3001/purchase/updatetransactionstatus`,{
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        success:false
        },{headers:{"Authorization":token}})
        alert('something went wrong')

  })

}
}
