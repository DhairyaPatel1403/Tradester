import React, {useState, useEffect} from 'react'
import { Stock } from './Stock'
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Stocks = () => {

    const navigate = useNavigate();

    const [stockData, setStockData] = useState([]);

    const clickHandler = async (id) => {
        // Your click handling logic here
        console.log("Clicked", id);

        navigate(`/stock-det/${id}`); 


      };

      useEffect(() => {
        // Make a GET request to fetch all stock data
        axios.get('http://localhost:3002/getallstock')
          .then((response) => {
            // Update the stockData state with the fetched data
            setStockData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching stock data:', error);
          });
      }, []);
      


  return (
    <div className='stock-container'>
      {stockData.map((stock) => (
        <Stock key={stock._id} id={stock.name} onClick={() => clickHandler(stock.name)} />
      ))}
    </div>
  )
}
