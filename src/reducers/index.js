import { combineReducers } from 'redux';
import loginReducer from './loginreducers'; // Import your reducer(s)

const rootReducer = combineReducers({
  login: loginReducer, // Define the name under which the state will be available
  // Other reducers
});

export default rootReducer;
