import React from 'react'
import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './actions/loginActions';
import { NavLink, useNavigate } from 'react-router-dom'


export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pan, setPan] = useState("");
    const [name, setName] = useState("");
    
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        
        signUpButton.addEventListener('click', () => {
          container.classList.add("right-panel-active");
        });
        
        signInButton.addEventListener('click', () => {
          container.classList.remove("right-panel-active");
        });
        }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        try {

            navigate('/Main'); 
            
        } 
        catch (error) {
            console.error('Error signing in:', error.message);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('PAN:', pan);

        
        try {
            
                    
        const api = axios.create({baseURL: 'http://localhost:3002'})
        api.post('/signup', {
            name: name,
            email: email,
            password: password,
            pan: pan
        })
        .then(res => {
            console.log(res)
            console.log(res.data.name)
            const name = res.data.name;
            navigate("/Main", { state: { name: name } }); 
        })
        .catch(error => {
            console.log(error)
        })

     
        } 
        catch (error) {
            console.error("SOME ERROR", 'Error signing in:', error.message);
        }
    };


  return (
    <div className='login'>

    <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUp}>
                <h2>Create Account</h2>
                
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" placeholder="Your PAN Number" name="pan" value={pan} onChange={(e) => setPan(e.target.value)}/>
                <button>Sign Up</button>
                </form>
            </div>



            <div className="form-container sign-in-container">
                <form onSubmit={handleSignIn}>
                <h2>Sign in</h2>
                <div className="social-container">
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us please login with your info</p>
                    <button className="ghost" id="signIn">Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h2>Make a new account</h2>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp">Sign Up</button>
                </div>
                </div>
            </div>
        </div>


    </div>
  )
}
