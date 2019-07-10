const initialState = {
  numA: 10,
  numB: 10,
  numC: 10,
  numD: 10,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_SIX_STATE_A':
      return {
        ...state,
        numA: action.data,
      };
    case 'CHANGE_SIX_STATE_B':
      return {
        ...state,
        numB: action.data,
      };
    case 'CHANGE_SIX_STATE_C':
      return {
        ...state,
        numC: action.data,
      };
    case 'CHANGE_SIX_STATE_D':
      return {
        ...state,
        numD: action.data,
      };
    default:
      return state;
  }
}
