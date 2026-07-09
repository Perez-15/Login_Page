import { describe, expect, it } from 'vitest';

import { getMillisecondsUntilTokenExpiry, parseTokenExpiryCookieValue } from './sessionCookie.util';

describe('parseTokenExpiryCookieValue', () => {
    it('returns token expiry stored as a JSON string', () => {
        const tokenExpiry = '2026-05-19T10:00:00.000Z';

        expect(parseTokenExpiryCookieValue(JSON.stringify(tokenExpiry))).toBe(tokenExpiry);
    });

    it('returns token expiry stored as a raw string', () => {
        const tokenExpiry = '2026-05-19T10:00:00.000Z';

        expect(parseTokenExpiryCookieValue(tokenExpiry)).toBe(tokenExpiry);
    });

    it('returns an empty string for empty or non-string JSON values', () => {
        expect(parseTokenExpiryCookieValue('')).toBe('');
        expect(parseTokenExpiryCookieValue(JSON.stringify({ tokenExpiry: '2026-05-19T10:00:00.000Z' }))).toBe('');
    });
});

describe('getMillisecondsUntilTokenExpiry', () => {
    const now = Date.parse('2026-05-19T10:00:00.000Z');

    it('returns a positive delay for a future expiry', () => {
        expect(getMillisecondsUntilTokenExpiry('2026-05-19T10:00:05.000Z', now)).toBe(5000);
    });

    it('returns zero or a negative delay for an expired token', () => {
        expect(getMillisecondsUntilTokenExpiry('2026-05-19T09:59:59.000Z', now)).toBe(-1000);
        expect(getMillisecondsUntilTokenExpiry('2026-05-19T10:00:00.000Z', now)).toBe(0);
    });

    it('returns null for missing or invalid expiry values', () => {
        expect(getMillisecondsUntilTokenExpiry('', now)).toBeNull();
        expect(getMillisecondsUntilTokenExpiry('not-a-date', now)).toBeNull();
    });
});
