import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export default createReducer(initialState, (builder) => {
  builder.addCase('IS_LOADING', (state) => {
    state.isLoading = true;
  });
});
