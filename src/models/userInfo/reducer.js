const initialState = { isLogin: false, userName: '', authority: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CANCEL_LOGIN_STATE':
      return {
        ...state,
        isLogin: true,
        userName: action.data.userName,
        authority: action.data.authority,
      };
    case 'CLEAR_LOGIN_STATE':
      return initialState;
    default:
      return state;
  }
}