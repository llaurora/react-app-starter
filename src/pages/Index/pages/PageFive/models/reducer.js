import produce from 'immer';

const initialState = { count: 100 };

export default produce((draft, action) => {
  if (action.type === 'TEST_PERSIST_STATE') {
    draft.count = action.data;
  }
}, initialState);
