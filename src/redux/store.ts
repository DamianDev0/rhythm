import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import challengeReducer from './challengeSlice';
import tokenReducer from './tokenSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['token', 'challenge'],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  challenge: challengeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
