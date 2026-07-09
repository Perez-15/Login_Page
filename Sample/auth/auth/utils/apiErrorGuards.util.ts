import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error;
}

function getErrorStatus(error: unknown): { responseCode?: number; message?: string } | undefined {
    if (!isFetchBaseQueryError(error) || typeof error.data !== 'object' || error.data === null) return undefined;
    const status = (error.data as { status?: { responseCode?: number; message?: string } }).status;
    return status;
}

export function getResponseCode(error: unknown): number | undefined {
    return getErrorStatus(error)?.responseCode;
}

export function getResponseMessage(error: unknown): string | undefined {
    return getErrorStatus(error)?.message?.toLowerCase();
}
