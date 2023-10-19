import React, {useState} from 'react'
import axios from 'axios';
import './style.css'

import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 

export const Transaction = () => {

    const nameofuser = useSelector((state) => state.user.name);

    const [amount, handleAmountChange] = useState(null)

    const amountNumber = parseFloat(amount);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(e) {
        e.preventDefault();
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:3002/transaction", {amountNumber, nameofuser});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }


        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        console.log(amount);
        console.log(currency);

        const options = {
            key: "rzp_test_YqgJwLsBFWMQup", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Tradester",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                alert("SUCESS")
            },
            prefill: {
                name: "Dhairya Patel",
                email: "dpvp1403@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Tradester Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
        
        try{
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        catch(e){
            console.log("TTTTTTTTTTTT", e);
        }

}
    


  return (
    <div className='transaction-box'>

        <form className='transaction-container'>
            <h1>Proceed your transaction</h1>

            <h2>Enter the amount</h2>

            <input
                type='number'  // Use type 'number' to ensure the input value is treated as a number
                onChange={(e) => handleAmountChange(e.target.value)}// Update 'amount' when the input changes
            />

            <button onClick={displayRazorpay}>Proceed the transaction</button>
        </form>

    </div>
  )
}
