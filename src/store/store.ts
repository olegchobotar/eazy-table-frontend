import { configureStore } from '@reduxjs/toolkit';
import { ApplicationReducer } from './reducers';

export const store = configureStore({
  reducer: {
    Application: ApplicationReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['users/login'],
      },
    }),
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
