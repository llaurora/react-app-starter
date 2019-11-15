import produce from 'immer';

const initialState = { isLogin: false, userName: '', authority: [] };

export default produce((draft, action) => {
  switch (action.type) {
    case 'CANCEL_LOGIN_STATE':
      draft.isLogin = true;
      draft.userName = action.payload.userName;
      draft.authority = action.payload.authority;

      return;

    case 'CLEAR_LOGIN_STATE':
      return initialState;

    // no default
  }
}, initialState);

// export function f(state = initialState, action) {
//   switch (action.type) {
//     case 'CANCEL_LOGIN_STATE':
//       return {
//         ...state,
//         isLogin: true,
//         userName: action.payload.userName,
//         authority: action.payload.authority,
//       };
//     case 'CLEAR_LOGIN_STATE':
//       return initialState;
//     default:
//       return state;
//   }
// }
