import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './storage';
import {setupListeners} from '@reduxjs/toolkit/query';
// Slices
import {api} from '@api/api-client';
import userSlice from './slices/userSlice';
import dashboardSlice from './slices/dashboardSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userSlice,
  dashboard: dashboardSlice,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
    devTools: true,
    preloadedState,
  });
export const store = setupStore();
export const persistor = persistStore(store);
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
