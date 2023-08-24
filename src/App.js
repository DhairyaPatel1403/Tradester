import './App.css';
import './style.css';
import { Login } from './Login';
import { Home } from './Home';
import { Main } from './Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
            <Route exact path='/' element={< Home />}></Route>  
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/Main' element={< Main />}></Route>
          </Routes>

      </Router>

      
    </div>
  );
}

export default App;
