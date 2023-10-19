import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import './style.css';
import { IndexPrice } from './IndexPrice';
import { Wallet } from './Wallet';
import { Stocks } from './Stocks';
import { NameManager } from "./GetDetails"; 
import axios from 'axios';
import {useLocation} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 


export const Main = () => {

  const dispatch = useDispatch();

  const nameofuser = useSelector((state) => state.user.name);

  const [username, setname] = useState(null);

  const location = useLocation();
  const name = location.state?.name;

  const nameManager = NameManager();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log("Name passed", name);

        dispatch(changeUserName(name));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function inside the useEffect
  
    // This is the cleanup function, which can be left empty in this case
    return () => {};
  }, [username]); // The second argument [] means this effect will run once, similar to componentDidMount
  
  

  return (
    <div className='main'>
      <Navbar/>
      <div className='dashboard'>
        <Wallet/>
        <div className='right'>
          <IndexPrice/>
          <Stocks/>
        </div>
        
      </div>
    </div>
  )
}
