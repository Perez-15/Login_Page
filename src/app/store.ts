import { configureStore } from '@reduxjs/toolkit';
import {authApi } from '../auth/auth/api/authApi'
import authReducer  from '../auth/auth/api/authSlice'


export const store = configureStore ({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


