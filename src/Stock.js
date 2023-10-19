import React from 'react'
import './style.css'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 

export const Stock = ({ id, onClick }) => {

  const nameofuser = useSelector((state) => state.user.name);

    const [prices, setprices] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await axios.post("http://localhost:3002/getprices", { id, nameofuser });
        
            // Assuming the response data contains a "prices" array, set it in the state
            if (response.data && response.data.prices) {
              setprices(response.data.prices);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        // Call the fetchData function
        fetchData();

        console.log(prices);
      }, [id]);
    

    const indexData = [
      {
        id: 1,
        year: 2021,
        userGain:1500,
        userLost: 1700,
      },
      {
        id: 2,
        year: 2022,
        userGain:1000,
        userLost: 1250,
      },
      {
        id: 3,
        year: 2023,
        userGain:2000,
        userLost: 1600,
      },
      {
        id: 4,
        year: 2024,
        userGain:2500,
        userLost: 1600,
      },
      {
        id: 5,
        year: 2025,
        userGain:1500,
        userLost: 1600,
      },
    ];
    


    
    const [userData, setUserData] = useState({
        labels: indexData.map((data)=> data.year),
        datasets: [{
            label: "Index Points",
            data:indexData.map((data)=> data.userGain),
            backgroundColor: ["green"],
            borderColor: ["black"], 
        }]

    })



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



  return (
    <div className='stock' onClick={() => onClick(id)}>
        <div className='stock-heading'>{id}</div>

            <Line data={userData} options={chartOptions}></Line>

        
    </div>
  )
}
