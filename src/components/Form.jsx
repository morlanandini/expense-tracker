import { useState, useEffect } from 'react';


export default function Form() {
    const [ expensename, setExpenseName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setExpenseAmount] = useState(0);
    const [date, setDate] = useState("");
  

    async function addExpense() {
        try {
          const expense = {
            "expenseName" :expensename,
            "category": category,
            "amount": amount,
            "date": date
          }
    
          const response = await fetch("http://127.0.0.1:8000/add/", {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify(expense)
          });
    
          const data = await response.json();
          console.log(data);
    
        }
        catch(error) {
          console.log(error)
        }
      }
    
    return (
        <><h1>Expense Tracker</h1><form id="expense-form" className='form' onSubmit={addExpense}>
            <input type="text" className="forms" id="expense-name" placeholder="Expense Name" required onChange={(event) => setExpenseName(event.target.value)} />
            <input type="number" className="forms" id="expense-amount" placeholder="Amount" required onChange={(event) => setExpenseAmount(event.target.value)} />
            <select id="expense-category" className="forms" required onChange={(event) => setCategory(event.target.value)}>
                <option value="" disabled selected>Select Category</option>
                <option value="All" defaultValue="Food">All</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
                <option value="gas">Gas</option>
                <option value="rent">Rent</option>
                <option value="shopping">Shopping</option>
                <option value="groceries">Groceries</option>
                <option value="others">Others</option>
            </select>
            <input type="date" className="forms" id="expense-date" placeholder='date' required onChange={(event) => setDate(event.target.value)} />
            <button type="submit"> Add Expense</button>
        </form></>
    )
}