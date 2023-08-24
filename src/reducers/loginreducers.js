const initialState = {
    loggedIn: false,
    // Other login-related state properties
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle login actions and update state accordingly
      case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
      };
      
      default:
        return state;
    }
  };
  
  export default loginReducer;
  