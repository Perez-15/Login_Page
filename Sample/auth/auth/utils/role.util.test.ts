import { describe, expect, it } from 'vitest';

import type { AuthUser } from '@/features/auth/store/auth/authSlice.type';
import { getAuthUserRoles } from './role.util';

const baseAuthUser: AuthUser = {
    user: {
        id: 'user-1',
        firstName: 'Sample',
        middleName: '',
        lastName: 'User',
        suffix: '',
        email: 'sample@example.com',
        userStatus: 'Active',
        locationScope: {
            divisions: [],
            clusters: [],
            zones: [],
            branches: []
        }
    },
    roles: {
        mainRole: {
            userRoleId: 'main-user-role',
            roleId: 'main-role',
            roleCode: 'OMG_USER',
            roleName: 'OMG User'
        },
        additionalRoles: [
            {
                userRoleId: 'additional-user-role',
                roleId: 'additional-role',
                roleCode: 'BSA',
                roleName: 'BSA',
                effectiveFrom: null,
                effectiveUntil: null
            }
        ]
    },
    modules: [],
    navigation: []
};

describe('getAuthUserRoles', () => {
    it('marks the main role as the main role and additional roles as non-main roles', () => {
        const roles = getAuthUserRoles(baseAuthUser);

        expect(roles).toEqual([
            expect.objectContaining({ roleCode: 'OMG_USER', isMainRole: true }),
            expect.objectContaining({ roleCode: 'BSA', isMainRole: false })
        ]);
    });

    it('keeps known roles unique by role code and filters unknown roles', () => {
        const roles = getAuthUserRoles({
            ...baseAuthUser,
            roles: {
                mainRole: baseAuthUser.roles.mainRole,
                additionalRoles: [
                    {
                        userRoleId: 'duplicate-user-role',
                        roleId: 'duplicate-role',
                        roleCode: 'OMG_USER',
                        roleName: 'Duplicate OMG User',
                        effectiveFrom: null,
                        effectiveUntil: null
                    },
                    {
                        userRoleId: 'unknown-user-role',
                        roleId: 'unknown-role',
                        roleCode: 'UNKNOWN_ROLE',
                        roleName: 'Unknown Role',
                        effectiveFrom: null,
                        effectiveUntil: null
                    },
                    ...baseAuthUser.roles.additionalRoles
                ]
            }
        } as AuthUser);

        expect(roles.map((role) => role.roleCode)).toEqual(['OMG_USER', 'BSA']);
        expect(roles.map((role) => role.isMainRole)).toEqual([true, false]);
    });
});
