import { describe, expect, it } from 'vitest';

import authReducer, { logout } from './authSlice.slice';
import type { AuthState } from './authSlice.type';
import { emptyUser } from './authSlice.type';

describe('authSlice logout', () => {
    it('returns a true logged-out state from a hydrated authenticated state', () => {
        const hydratedState: AuthState = {
            authUser: {
                ...emptyUser,
                user: {
                    ...emptyUser.user,
                    id: 'user-1',
                    firstName: 'Logged',
                    lastName: 'In'
                }
            },
            verificationContact: {
                email: 'user@example.com',
                mobileNumber: '09171234567'
            },
            isAuthenticated: true,
            step: 'verification',
            otpType: 'email',
            alertType: 'error',
            tokenExpiry: '2026-05-19T10:00:00.000Z'
        };

        const state = authReducer(hydratedState, logout());

        expect(state.isAuthenticated).toBe(false);
        expect(state.authUser).toEqual(emptyUser);
        expect(state.verificationContact).toEqual({ email: '', mobileNumber: '' });
        expect(state.step).toBe('login');
        expect(state.otpType).toBe('neutral');
        expect(state.alertType).toBeNull();
        expect(state.tokenExpiry).toBeNull();
    });
});
