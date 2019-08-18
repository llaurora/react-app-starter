const initialState = { isLogin: false, userName: '' };
export default function(state = initialState, action) {
  switch (action.type) {
    case 'CANCEL_LOGIN_STATE':
      return {
        ...state,
        isLogin: true,
        userName: action.data.userName,
      };
    case 'CLEAR_LOGIN_STATE':
      return initialState;
    default:
      return state;
  }
}
