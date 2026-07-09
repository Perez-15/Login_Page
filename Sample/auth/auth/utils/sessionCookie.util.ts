import Cookies from 'js-cookie';
import type { AuthUser } from '@/features/auth/store/auth/authSlice.type';
import type { AuthRoleData } from '@/features/auth/types/authTypes.type';

const USER_INFO_COOKIE = 'userInfo';
const TOKEN_EXPIRY_COOKIE = 'tokenExpiry';
export const ACTIVE_ROLE_COOKIE = 'activeRole';
const DEFAULT_EXPIRES_DAYS = 1 / 3; // 8 hours

export function setUserCookie(user: AuthUser, expiresDays = DEFAULT_EXPIRES_DAYS) {
    Cookies.set(USER_INFO_COOKIE, JSON.stringify(user), { expires: expiresDays, sameSite: 'Lax' });
}

export function setTokenExpiryCookie(tokenExpiry: string) {
    const tokenExpiryDate = new Date(tokenExpiry);
    Cookies.set(TOKEN_EXPIRY_COOKIE, JSON.stringify(tokenExpiry), { expires: tokenExpiryDate, sameSite: 'Lax' });
}

export function parseTokenExpiryCookieValue(tokenExpiry: string): string {
    if (!tokenExpiry) {
        return '';
    }

    try {
        const parsedTokenExpiry = JSON.parse(tokenExpiry);
        return typeof parsedTokenExpiry === 'string' ? parsedTokenExpiry : '';
    } catch {
        return tokenExpiry;
    }
}

export function getTokenExpiryCookie(): string {
    return parseTokenExpiryCookieValue(Cookies.get(TOKEN_EXPIRY_COOKIE) ?? '');
}

export function getMillisecondsUntilTokenExpiry(tokenExpiry: string, now = Date.now()): number | null {
    if (!tokenExpiry) {
        return null;
    }

    const expiryTime = new Date(tokenExpiry).getTime();

    if (Number.isNaN(expiryTime)) {
        return null;
    }

    return expiryTime - now;
}

export function clearTokenExpiryCookie() {
    Cookies.remove(TOKEN_EXPIRY_COOKIE);
}

export function clearUserCookie() {
    Cookies.remove(USER_INFO_COOKIE);
}

export function setActiveRoleCookie(role: AuthRoleData) {
    Cookies.set(ACTIVE_ROLE_COOKIE, role.roleCode, { expires: DEFAULT_EXPIRES_DAYS, sameSite: 'Lax' });
}

export function clearActiveRoleCookie() {
    Cookies.remove(ACTIVE_ROLE_COOKIE);
}
