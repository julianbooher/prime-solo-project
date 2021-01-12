const fixturesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FIXTURES':
        return action.payload;
      case 'UNSET_FIXTURES':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default fixturesReducer;