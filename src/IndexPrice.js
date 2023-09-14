import React from 'react'
import './style.css'
import { Bar } from 'react-chartjs-2'
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
    ]

    const [userData, setUserData] = useState({
        labels: indexData.map((data)=> data.year),
        datasets: [{
            label: "User Gained",
            data:indexData.map((data)=> data.userGain),
            backgroundColor: ["orange"]
        }]

    })

  return (
    <div className='index-container'>
        <div className='index-card'>
            <Bar data={userData}></Bar>
        </div>
        
    </div>
  )
}
