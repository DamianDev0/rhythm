import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import challengeReducer from './challengeSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    challenge: challengeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
