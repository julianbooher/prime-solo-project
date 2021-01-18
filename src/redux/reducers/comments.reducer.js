const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload;
        case 'UNSET_COMMENTS':
            return [];
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default commentsReducer;