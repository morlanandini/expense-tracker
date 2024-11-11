import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import Component from './Visualize'



export default function Table() {
    const [ filter, setFilterValue] = useState("All");
    const [ filterMonth, setFilterValuebyMonth] = useState("All");
    const [total, setTotal] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [chartData, setChartData] = useState([]);

    function calculateMonthlyTotals(expenses) {
      const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "long" }),
        amount: 0
      }));
    
      expenses.forEach((expense) => {
        const monthIndex = new Date(expense.date).getMonth();
        monthlyTotals[monthIndex].amount += expense.amount;
      });
    
      return monthlyTotals;
    }
    

    function calculateTotal(expenses) {
        let totalAmount = 0;
        for (let i = 0; i < expenses.length; i++) {
          totalAmount += expenses[i].amount;
        }
        setTotal(totalAmount.toFixed(2));
    }

    async function fetchExpenses() {
        try {
          if(filter == "All" && filterMonth == "All")
          {
            const response = await fetch('http://127.0.0.1:8000/expenses/');
            const data = await response.json();
            //   console.log(data);
            console.log(filterMonth+" sxqjbdnhwejkjbc");
              calculateTotal(data);
              setExpenses(data);    
              setChartData(calculateMonthlyTotals(data)); // Set chart data

          }

          else if(filterMonth == "All" && filter!="All"){
            const response = await fetch(`http://127.0.0.1:8000/expenses/?category=${filter}`);
            const data = await response.json();
            calculateTotal(data);
            setExpenses(data);
            setChartData(calculateMonthlyTotals(data)); // Set chart data

          }

          else if(filter == "All" && filterMonth!="All"){
            const response = await fetch(`http://127.0.0.1:8000/expenses/?month=${filterMonth}`);
            const data = await response.json();
            calculateTotal(data);
            setExpenses(data);
            setChartData(calculateMonthlyTotals(data)); // Set chart data

          }

          else {
            const response = await fetch(`http://127.0.0.1:8000/expenses/?month=${filterMonth}&category=${filter}`);
            const data = await response.json();
            calculateTotal(data);
            setExpenses(data);
            setChartData(calculateMonthlyTotals(data)); // Set chart dat
          }
          
        }
        catch(error) {
          console.log(error);
        }
    }

      async function deleteExpense(id) {
        try {
          console.log(id +" in delete")
          const response = await fetch(`http://127.0.0.1:8000/delete/${id}/`, {
            method: "DELETE",
          });
      
          if (response.ok) {
            // Remove the deleted expense from the local state
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
            console.log("Expense deleted successfully");
          } else {
            console.error("Failed to delete expense");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }

      useEffect (() => {
        fetchExpenses();
      },[filter, filterMonth]);



    return (
        <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={index}>
                  <td>{expense.expenseName}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>  
                    <button><Pencil /> </button>    
                    <button className='px-5' onClick={() => deleteExpense(expense.id)} ><Trash2 /></button>   </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )
          }
          </tbody>
        </table>

        <div className="filter">
        <label htmlFor="filter-category">Filter by Category:</label>
        <select
          id="filter-category"
          value={filter}
          onChange={(event) => setFilterValue(event.target.value)}      >
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
      </div>

      <div className="filter" >
        <label htmlFor="filter-category">Filter by Month:</label>
        <select
          id="filter-category"
          value={filterMonth}
          onChange={(event) => setFilterValuebyMonth(event.target.value)}      >
          <option value="All" defaultValue="Food">All</option>
          <option value="12">Dec</option>
          <option value="11">Nov</option>
          <option value="10">Oct</option>
          <option value="09">Sept</option>
          <option value="08">Aug</option>
          <option value="07">July</option>
          <option value="06">June</option>
          <option value="05">May</option>
          <option value="04">April</option>
          <option value="03">March</option>
          <option value="02">Feb</option>
          <option value="01">Jan</option>
        </select>
      </div>

        <div className="total-amount">
          <strong>Total: ${total}</strong> 
        </div>

          <Component chartData={chartData} ></Component>

      </div>
    )
}