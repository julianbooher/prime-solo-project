const userRatingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_RATING':
            return action.payload;
        case 'UNSET_USER_RATING':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userRatingReducer;