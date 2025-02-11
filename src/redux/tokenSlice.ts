import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
  userId: string | null;
  oneSignalPlayerId: string | null;
  isAuthenticated: boolean;
}

const initialState: TokenState = {
  token: null,
  userId: null,
  oneSignalPlayerId: null,
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
    setOneSignalPlayerId(state, action: PayloadAction<string>) {
      state.oneSignalPlayerId = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.userId = null;
      state.oneSignalPlayerId = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setToken, setOneSignalPlayerId, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;
