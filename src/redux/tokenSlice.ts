import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

const initialState: TokenState = {
  token: null,
  userId: null,
  isAuthenticated: false,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{token: string; userId: string}>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = !!action.payload.token;
    },
    clearToken(state) {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;
