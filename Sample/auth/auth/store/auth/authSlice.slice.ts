import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AlertType } from '@/components/ui/StyledAlert';
import type { AuthStep, AuthUser, OtpType } from './authSlice.type';
import { getLoggedOutState, initialState } from './authSlice.type';

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<AuthStep>) {
            state.step = action.payload;
        },
        setOtpType(state, action: PayloadAction<OtpType>) {
            state.otpType = action.payload;
        },
        setStyledAlert(state, action: PayloadAction<AlertType>) {
            state.alertType = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.verificationContact.email = action.payload;
        },
        setMobileNumber(state, action: PayloadAction<string>) {
            state.verificationContact.mobileNumber = action.payload;
        },
        setAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setCredentials(state, action: PayloadAction<AuthUser>) {
            state.authUser = action.payload;
        },
        setTokenExpiry(state, action: PayloadAction<string>) {
            state.tokenExpiry = action.payload;
        },
        logout() {
            return getLoggedOutState();
        }
    }
});

export const { setStep, setOtpType, setStyledAlert, setEmail, setMobileNumber, setAuthenticated, setCredentials, logout, setTokenExpiry } =
    authSlice.actions;

export default authSlice.reducer;
