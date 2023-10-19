import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './style.css'

import { useSelector } from 'react-redux';

export const History = () => {

    const nameofuser = useSelector((state) => state.user.name);

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const fetch = async() =>{

            try{

                console.log(nameofuser)

                
                const response = await axios.get('http://localhost:3002/history', {
                    params: {
                    nameofuser: nameofuser
                    }
                });

                setHistory(response.data.stockBought)

                if(!history){
                    console.log("No history found")
                }
                else{
                    console.log(history)
                }

                
            }
            catch(error){
                console.log(error)
            }
        }

        fetch();

      
    }, [])
    

    return (
        <div className='history-main'>
          {history.length > 0 ? (
            history.map((transaction) => (
                <details>
                <summary>
                    <span class="summary-title">{transaction.name}</span>
                    <div class="summary-chevron-up">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </summary>
            
                <div class="summary-content">This stock was traded at - {transaction.date}</div>
                <div class="summary-chevron-down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </div>
            </details>
            ))
          ) : (
            <p style={{color:"white"}}>No transactions to display.</p>
          )}

        </div>
      );
      
      

}
      