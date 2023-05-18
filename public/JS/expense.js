let expenseForm = document.getElementById('expenseForm')
expenseForm.addEventListener('submit',submitForm)

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
    ul.appendChild(li)
}

const getExpense = async () =>{
    let ul = document.getElementById('expenses')
    ul.innerHTML=''
   let resp = await axios.get('http://localhost:3001/expense/allexpenses')
  // print(item)
  console.log('get resp',resp.data)
  resp.data.map((item)=> print(item))
}
 window.addEventListener('DOMContentLoaded',getExpense)
const postExpense = async (expense) => {
    let resp = await axios.post('http://localhost:3001/expense/addexpense',expense)
    console.log('post resp',resp)
}

