
const defaultState = {
  info: {},
  players: [],
}


const teamReducer = (
  state = defaultState, 
  action) => {
  switch (action.type) {
      case 'SET_TEAM_INFO':
          return {...state, info: action.payload};
      case 'SET_TEAM_PLAYERS':
          return {...state, players: action.payload};
      case 'UNSET_TEAM_INFO':
          return defaultState;
      default:
        return state;
  }
};

// user will be on the redux state at:
// state.user
export default teamReducer;