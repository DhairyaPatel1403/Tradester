import React from 'react'
import img from './image.png';


export const Home = () => {
  return (
    <div className='home'>
        <div className='homenav'>
            <div className='logo'>Tradester</div>
                <div className='item-cont'>
                    <a href="/login">Login/Signup</a>
                </div>

        </div>
        <div className='homecontainer'>
            <div className='image'><img src={img}></img></div>
            <div className='heading'>India's Easiest Trading App</div>
        </div>

    </div>
  )
}
