import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
