import React, {useState, useEffect} from 'react'
import './style.css'
import { Wallet_Stocks } from './Wallet_Stocks'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import { NameManager } from "./GetDetails"; 

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 



export const Wallet = () => {

  const navigate = useNavigate();

  const nameManager = NameManager();

  const nameofuser = useSelector((state) => state.user.name);

    const [stockHolding, setStockHolding] = useState([]);

    const [account, setAccount] = useState(null);

    const [invest, setInvest] = useState(null);

    const [username, setname] = useState(null);

    useEffect(() => {
      // Define an async function to fetch the data
      const fetchData = async () => {
        try {
          // Make an Axios GET request to fetch the data
          const response = await axios.get('http://localhost:3002/wallet', {
            params: {
              nameofuser: nameofuser
            }
          });

    
          // Extract the stockHolding array and account from the response data
          const { stockHolding, account, totalValue } = response.data;
    
          // Set the stockHolding array and account in the component state
          setStockHolding(stockHolding);
          setAccount(account);
          setInvest(totalValue);
        } catch (error) {
          console.error('Error fetching data:', error); 
        }
      };

      setname(nameManager.getName());
    
      // Call the fetchData function
      fetchData();
    }, [username]);

    const add_money = async () => {
      navigate('/transaction'); 
    };
    

    

  return (
    <div className='wallet'>
        <div className='wallet-head'>{nameofuser}'s wallet</div>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='wallet-head' style={{ color: 'tomato', fontSize: '1.5vw' }}>Your Balance - </div> <div className='wallet-head' style={{ color: 'white', fontSize: '1.5vw' }}> {account}</div>
          <button className='add-btn' onClick={add_money}>+</button>
        </div> 


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='wallet-head' style={{ color: 'tomato', fontSize: '1vw' }}>Total amount invested - </div> <div className='wallet-head' style={{ color: 'white', fontSize: '1vw' }}> {invest}</div>
        </div> 

        

        <div className='wallet-stock-container'>

        {stockHolding.map((stock, index) => (

                <Wallet_Stocks name={stock.name} bp={stock.bought_price} amount={stock.amount}/>

        ))}

        </div>

    </div>
  )
}
