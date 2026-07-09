import { switchActiveNavigation, switchRole } from '@/access-control/store/accessControl.slice';
import { flatMapRolesNavigation, getNavigationForRole } from '@/access-control/utils/accessControlUtils.util';
import { useAppDispatch } from '@/app/hooks';
import { useLazyAfterLoginQuery } from '@/features/auth/api/authApi.api';
import { setAuthenticated, setCredentials } from '@/features/auth/store/auth/authSlice.slice';
import type { AuthUser } from '@/features/auth/store/auth/authSlice.type';
import { getAuthUserRoles } from '@/features/auth/utils/role.util';
import { setActiveRoleCookie, setUserCookie } from '@/features/auth/utils/sessionCookie.util';
import { PATHS } from '@/routes/paths.const';
import { useNavigate } from 'react-router';

export function useAfterLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [afterLogin, { isLoading }] = useLazyAfterLoginQuery();

    const handleAllowed = async () => {
        try {
            const afterLoginResponse = await afterLogin().unwrap();
            const responseData = afterLoginResponse.responseData;
            const merged: AuthUser = {
                ...responseData,
                navigation: flatMapRolesNavigation(responseData.roles.mainRole, responseData.roles.additionalRoles, responseData.modules)
            };
            const mainRole = getAuthUserRoles(merged).find((role) => role.isMainRole);

            if (!mainRole) {
                console.warn('User has no recognized main role assigned, cannot complete access-control setup.');
                return;
            }

            dispatch(setCredentials(merged));
            dispatch(switchRole(mainRole));
            dispatch(switchActiveNavigation(getNavigationForRole(mainRole.roleCode, merged.navigation)));
            dispatch(setAuthenticated(true));
            setUserCookie(merged);
            setActiveRoleCookie(mainRole);
            navigate(PATHS.DASHBOARD);
        } catch (_error) {
            // Let callers decide how to surface the failure.
            console.error(_error);
        }
    };

    return { handleAllowed, isLoading };
}
