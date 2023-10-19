import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mongoose from 'mongoose';
import axios from 'axios';
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 


export const Stockdet = () => {

  const [amountstock, setAmountstock] = useState(0)

  const nameofuser = useSelector((state) => state.user.name);

  const indexData = [
    {
      id: 1,
      year: 2021,
      userGain:1520,
      userLost: 1700,
    },
    {
      id: 2,
      year: 2022,
      userGain:1700,
      userLost: 1250,
    },
    {
      id: 3,
      year: 2023,
      userGain:462,
      userLost: 1600,
    },
    {
      id: 4,
      year: 2024,
      userGain:5200,
      userLost: 1600,
    },
    {
      id: 5,
      year: 2025,
      userGain:1200,
      userLost: 1600,
    },
    {
      id: 6,
      year: 2025,
      userGain:3500,
      userLost: 1600,
    },
  ];

  const [pricesList, setPricesList] = useState([]);

  const [highest, setHighest] = useState(0)

    const { id } = useParams();

    const [Stock, setStock] = useState(null)

    useEffect(() => {

      const calculateHighest = () => {
        if (Stock && pricesList) {
          let highestPrice = 0;
          for (const price of Stock.prices) {
            if (price > highestPrice) {
              highestPrice = price;
            }
          }
          setHighest(highestPrice);
        } else {
          // Handle the case when Stock.prices is null or empty
          setHighest("Loading data...");
        }
      };
      

        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:3002/stock-det/${id}`);
              setStock(response.data);
              console.log("Stock - ", response.data);
              setPricesList(response.data.prices);
              console.log(pricesList)

            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle the error here, e.g., display an error message to the user
            }
          };

        fetchData();
        calculateHighest();

      



      
    }, [highest])

    const buy = async (stockName) => {
      try {
        // Send an Axios POST request to your server
        const response = await axios.post('http://localhost:3002/buy', { stockName, amountstock, nameofuser });
    
        // Check the response message from the server
        if (response.data && response.data.message) {
          // Display the message received from the server in an alert
          alert(response.data.message);
        } else {
          // Handle the case where the response does not contain a message
          console.error('Invalid server response:', response);
        }
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error('Error buying stock:', error);
      }
    };
    const sell = async (stockName) => {
        try {
          // Send an Axios POST request to your server
          await axios.post('http://localhost:3002/sell', { stockName, amountstock, nameofuser });
      
          // Handle success, e.g., show a success message to the user
          alert(`Sold ${stockName} successfully!`);
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          console.error('Error buying stock:', error);
        }
    };



    const chartOptions = {
      responsive: true, // Make the chart responsive
      maintainAspectRatio: false, // Disable aspect ratio to make it fit the container's width
      // other chart options
      scales: {
          x: {
              beginAtZero: true,
              ticks: {
                  display:false,
                  color: 'black', // Set x-axis label color to black
              },
          },
          y: {
              beginAtZero: true,
              ticks: {
                  color: 'black', // Set y-axis label color to black
              },
          },
      },

      plugins: {
          legend: {
              labels: {
                  color: 'black', // Set legend label color to black
              },
          },
      },
  };

  const [userData, setUserData] = useState({
    labels: indexData.map((data)=> data.year),
    datasets: [{
        label: "Index Points",
        data:indexData.map((data)=> data.userGain),
        backgroundColor: ["orange"],
        borderColor: ["black"], 
    }]

})
      
    
    


  return (
    <div className='stock-det'>
      <center>
      {Stock && (
        
        <div className='stock-card'>
            <h1>{Stock.name} Details</h1>
            <p>Name: {Stock.name}</p>
            <p>Price: {Stock.price}</p>
            <p>Bought Price: {Stock.bought_price}</p>
            <p>Revenue: {Stock.revenue}</p>
            <p>Type: {Stock.type}</p>
            <h2>Prices:</h2>
            <ul>
              <Line data={userData} options={chartOptions}></Line>
            </ul>
            <ul>
              Highest price among all years - {highest}
            </ul>
        </div>
        
        )}

        <div className='buysell'>
          <input type="number" style={{ width: '5%' }}  onChange={(e) => setAmountstock(e.target.value)}></input><br></br>
          <button onClick={() => buy(Stock.name)}>Buy</button>
          <button onClick={() => sell(Stock.name)}>Sell</button>
        </div>

        </center>
    </div>
  )
}
