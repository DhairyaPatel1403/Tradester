import React from 'react'
import Navbar from './Navbar'
import './style.css';
import { IndexPrice } from './IndexPrice';


export const Main = () => {
  return (
    <div className='main'>
      <Navbar/>
      <IndexPrice/>
    </div>
  )
}
