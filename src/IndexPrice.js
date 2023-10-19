import React from 'react'
import './style.css'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState } from 'react'

export const IndexPrice = () => {

    const indexData=[
        {
            id:1,
            year:2021,
            userGain:17000,
            userLost:1700,
        },
        {
            id:2,
            year:2022,
            userGain:15000,
            userLost:1250,
        },
        {
            id:3,
            year:2023,
            userGain:22000,
            userLost:1600,
        },
        {
            id:4,
            year:2024,
            userGain:32000,
            userLost:1600,
        },
        {
            id:5,
            year:2025,
            userGain:52000,
            userLost:1600,
        },
        {
            id:6,
            year:2026,
            userGain:12000,
            userLost:1600,
        },
        {
            id:7,
            year:2027,
            userGain:62000,
            userLost:1600,
        },
        {
            id:8,
            year:2028,
            userGain:22000,
            userLost:1600,
        },
        {
            id:9,
            year:2029,
            userGain:29000,
            userLost:1600,
        },
    ]

    const [userData, setUserData] = useState({
        labels: indexData.map((data)=> data.year),
        datasets: [{
            label: "Index Points",
            data:indexData.map((data)=> data.userGain),
            backgroundColor: ["orange"],
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
    <div className='index-container'>
        <div className='index-card'>
            <Line data={userData} options={chartOptions} ></Line>
        </div>

        

        
    </div>
  )
}
