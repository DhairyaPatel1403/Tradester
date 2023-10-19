import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mongoose from 'mongoose';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 


export const Wallet_Stocks = ({name, bp, amount}) => {

  const [Stock, setStock] = useState(null)

  const nameofuser = useSelector((state) => state.user.name);

  
    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:3002/stock-det/${name}`);
              setStock(response.data);
              console.log("Stock - ", response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle the error here, e.g., display an error message to the user
            }
          };

        fetchData();
      
    }, [])

    const clickHandler = async (stockName) => {
      console.log("Going to stock details");
      navigate(`/stock-det/${stockName}`); 
  };



  return (
    <div className='wallet-stock' onClick={() => clickHandler(name)}>
        <div className='wallet-stock-name'>
            {name}
        </div>
        <div className='wallet-details'>
            <div className='wallet-stock-current'>Current price - {Stock && Stock.price}</div>

            <div className='wallet-stock-bought'>Bought Price - {bp}</div>
        </div>

        <div>Amount bought - {amount}</div>
    </div>
  )
}
