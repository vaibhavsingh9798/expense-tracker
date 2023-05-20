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

function print(item){
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

const getExpense = async () =>{
    console.log('get call token',token)
   
    let ul = document.getElementById('expenses')
    ul.innerHTML=''
   let resp = await axios.get('http://localhost:3001/expense/allexpenses',{headers:{"Authorization":token}})
  // print(item)
  console.log('get resp',resp.data)
  resp.data.map((item)=> print(item))
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