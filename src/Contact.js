import React, {useState} from 'react'
import './style.css'
import { useForm, ValidationError } from '@formspree/react';

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 

export const Contact = () => {

    const [query, setquery] = useState("")

    const [state, handleSubmit] = useForm("mknaapvv");

    const nameofuser = useSelector((state) => state.user.name);

    console.log(nameofuser);


    return (
      <div className='contactbody'>
        <center>


      <div className="container font-style" style={{ background:"#bb5921"}}>
        
        <div style={{ textAlign: 'center' }}>
          <h1>Contact Us</h1>
          <h2>Swing by for a cup of coffee, or leave us a message:</h2>
        </div>
        <div className="row">

          <div className="column">
            <form onSubmit={handleSubmit} style={{ background:"#bb5921"}}>
             
              <h3 htmlFor="subject" style={{color:"white"}}>Write your query or feedback to us !!</h3>
              <input id="name" name="name" value={nameofuser} />

              <textarea
                onChange={(e) => setquery(e.target.value)}
                className='textcontact'
                id="message"
                name="message"
                placeholder="Write something.."
                style={{ height: '170px' }}
              ></textarea>
              <button className='contactsubmit' type="submit" >Submit</button>
            </form>
          </div>
        </div>
        
      </div>

      </center>
      </div>
    );
  };
  