// userReducer.js
const initialState = {
    user: {
      name: 'robin',
    },
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_USER_NAME':
        return {
          ...state,
          user: {
            ...state.user,
            name: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  