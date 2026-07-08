import type { PayloadAction} from '@reduxjs/toolkit';
import type{ LoginResponse } from './authApi';
import { createSlice} from '@reduxjs/toolkit';
import { authApi} from './authApi';

interface AuthState {
    user: LoginResponse | null;
    isAuthenticated: boolean;
}

 const initialState: AuthState = { user: null, isAuthenticated: false};

 const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
           (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
           }
            
        );
    },
 });

 export const { logout } = authSlice.actions;
 export default authSlice.reducer;