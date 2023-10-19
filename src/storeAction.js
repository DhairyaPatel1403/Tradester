import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers'; 

export const changeUserName = (newName) => {
    return {
      type: 'CHANGE_USER_NAME',
      payload: newName,
    };
  };