import './App.css';
import './style.css';
import { Login } from './Login';
import { Home } from './Home';
import { Main } from './Main';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Stockdet } from './Stockdet';
import { Transaction } from './Transaction';
import { History } from './History';
import { Contact } from './Contact';

function App() {

  const loggedIn = true


  return (
    <div className="App">
      <Router>

        <Routes>
            <Route exact path='/' element={<Main/>}></Route>  
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/Main' element={< Main />}></Route>
            <Route exact path='/stock-det/:id' element={< Stockdet />}></Route>
            <Route exact path='/transaction' element={< Transaction />}></Route>
            <Route exact path='/History' element={< History />}></Route>
            <Route exact path='/Contact' element={< Contact />}></Route>
          </Routes>

      </Router>

      
    </div>
  );
}

export default App;


