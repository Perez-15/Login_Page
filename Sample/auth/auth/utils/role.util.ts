import type { AuthUser } from '@/features/auth/store/auth/authSlice.type';
import type { AuthRoleWithMainFlag, UserRole } from '@/features/auth/types/authTypes.type';

const KNOWN_USER_ROLES: ReadonlySet<UserRole> = new Set([
    'OMG_USER',
    'OMG_SUPERVISOR',
    'CRR',
    'RET_SUPERVISOR',
    'BSA',
    'SALES_REPRESENTATIVE',
    'SALES_SUPERVISOR',
    'CREDIT_INVESTIGATOR',
    'DEBUG'
]);

export function isKnownUserRole(roleCode: string): roleCode is UserRole {
    return KNOWN_USER_ROLES.has(roleCode as UserRole);
}

export function getAuthUserRoles(authUser: AuthUser): AuthRoleWithMainFlag[] {
    const roles = authUser.roles;
    if (!roles?.mainRole) return [];

    const backendRoles: AuthRoleWithMainFlag[] = [
        { ...roles.mainRole, isMainRole: true },
        ...(roles.additionalRoles ?? []).map((role) => ({ ...role, isMainRole: false }))
    ];
    const seenRoleCodes = new Set<UserRole>();

    return backendRoles.filter((role) => {
        if (!isKnownUserRole(role.roleCode) || seenRoleCodes.has(role.roleCode)) return false;
        seenRoleCodes.add(role.roleCode);
        return true;
    });
}
