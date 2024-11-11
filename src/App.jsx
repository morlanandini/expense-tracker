import { useState, useEffect } from 'react';
import './App.css';
import './styles.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import  Table  from './components/Table'
import Form from './components/Form'
import Component from './components/Visualize'

ChartJS.register(ArcElement, Tooltip, Legend);



function App() {
  return (
    <>
    <Form></Form>
    <Table></Table>
\    </>
  );
}

export default App;



