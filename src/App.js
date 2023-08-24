import './App.css';
import './style.css';
import { Login } from './Login';
import { Home } from './Home';
import { Main } from './Main';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const loggedIn = useSelector(state => state.login.loggedIn);


  return (
    <div className="App">
      <Router>

        <Routes>
            <Route exact path='/' element={loggedIn ? <Home/> : <Main/>}></Route>  
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/Main' element={< Main />}></Route>
          </Routes>

      </Router>

      
    </div>
  );
}

export default App;
