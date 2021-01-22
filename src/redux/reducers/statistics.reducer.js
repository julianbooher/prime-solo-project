const statisticsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATISTICS':
            return action.payload;
        case 'UNSET_STATISTICS':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default statisticsReducer;