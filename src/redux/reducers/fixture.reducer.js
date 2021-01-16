
const defaultState = {
    info: {},
    comments: [],
    players: [],
    userRating: {}
}


const fixtureReducer = (
    state = defaultState, 
    action) => {
    switch (action.type) {
        case 'SET_FIXTURE_INFO':
            return {...state, info: action.payload};
        case 'SET_FIXTURE_COMMENTS':
            return {...state, comments: action.payload};
        case 'SET_FIXTURE_PLAYERS':
            return{...state, players: action.payload}
        case 'SET_FIXTURE_USER_RATING':
            return{...state, userRating: action.payload}
        case 'UNSET_FIXTURE_INFO':
            return defaultState;
        default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default fixtureReducer;