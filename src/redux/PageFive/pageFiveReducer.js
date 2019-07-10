const initialState = { count: 100 };
export default function(state = initialState, action) {
  if (action.type === 'TEST_PERSIST_STATE') {
    return {
      ...state,
      count: action.data,
    };
  }

  return state;
}
