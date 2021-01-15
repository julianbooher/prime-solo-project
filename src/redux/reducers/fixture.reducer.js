const fixtureReducer = (
    state = {
        info: {},
        comments: [],
        players: []
    }, 
    action) => {
    switch (action.type) {
        case 'SET_FIXTURE_INFO':
            return {...state, info: action.payload};
        case 'SET_FIXTURE_COMMENTS':
            return {...state, comments: action.payload};
        case 'SET_FIXTURE_PLAYERS':
            return{...state, players: action.payload}
        case 'UNSET_FIXTURE_INFO':
            return {};
        default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default fixtureReducer;