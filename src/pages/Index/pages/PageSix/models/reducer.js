import produce from 'immer';

const initialState = {
  numA: 10,
  numB: 10,
  numC: 10,
  numD: 10,
};

export default produce((draft, action) => {
  switch (action.type) {
    case 'CHANGE_SIX_STATE_A':
      draft.numA = action.data;

      return;

    case 'CHANGE_SIX_STATE_B':
      draft.numB = action.data;

      return;

    case 'CHANGE_SIX_STATE_C':
      draft.numC = action.data;

      return;

    case 'CHANGE_SIX_STATE_D':
      draft.numD = action.data;

    // no default
  }
}, initialState);
