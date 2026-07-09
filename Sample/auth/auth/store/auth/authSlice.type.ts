import { PermissionsType } from '@/access-control/types/accessControlType.type';
import { AlertType } from '@/components/ui/StyledAlert';

import { getUserFromCookie } from '@/utils/parseCookies';
import {
    OMG_USER_NAVIGATION,
    OMG_SUPERVISOR_NAVIGATION,
    CRR_USER_NAVIGATION,
    BSA_USER_NAVIGATION,
    RET_SUPERVISOR_NAVIGATION
} from '../../constants/navigation.const';
import { AfterLoginData, RoleAllowedNavigations } from '../../types/authTypes.type';

export type AuthStep = 'login' | 'new' | 'reset' | 'choose' | 'verification' | 'forgotSelection' | 'forgotPassword' | 'confirmed';
export type OtpType = 'email' | 'sms' | 'sms_forgot' | 'email_forgot' | 'neutral';

export interface AuthUser extends AfterLoginData {
    permissions?: PermissionsType[];
    navigation: RoleAllowedNavigations[];
}

export interface VerificationContact {
    email: string;
    mobileNumber: string;
}

export interface AuthState {
    authUser: AuthUser;
    verificationContact: VerificationContact;
    isAuthenticated: boolean;
    step: AuthStep;
    otpType: OtpType;
    alertType: AlertType;
    tokenExpiry: string | null;
}

export const emptyUser: AuthUser = {
    user: {
        id: '',
        firstName: 'Sample',
        middleName: '',
        lastName: 'User',
        suffix: '',
        email: '',
        userStatus: '',
        locationScope: {
            divisions: [],
            clusters: [],
            zones: [],
            branches: []
        }
    },
    roles: {
        mainRole: {
            userRoleId: '',
            roleId: '',
            roleCode: 'OMG_USER',
            roleName: 'OMG User'
        },
        additionalRoles: [
            {
                userRoleId: '',
                roleId: '',
                roleCode: 'CRR',
                roleName: 'CRR',
                effectiveFrom: null,
                effectiveUntil: null
            },
            {
                userRoleId: '',
                roleId: '',
                roleCode: 'BSA',
                roleName: 'BSA',
                effectiveFrom: null,
                effectiveUntil: null
            },
            {
                userRoleId: '',
                roleId: '',
                roleCode: 'OMG_SUPERVISOR',
                roleName: 'OMG Supervisor',
                effectiveFrom: null,
                effectiveUntil: null
            },
            {
                userRoleId: '',
                roleId: '',
                roleCode: 'RET_SUPERVISOR',
                roleName: 'RET Supervisor',
                effectiveFrom: null,
                effectiveUntil: null
            }
        ]
    },
    modules: [],
    navigation: [
        {
            userRole: 'OMG_USER',
            navigation: OMG_USER_NAVIGATION
        },
        {
            userRole: 'OMG_SUPERVISOR',
            navigation: OMG_SUPERVISOR_NAVIGATION
        },
        {
            userRole: 'CRR',
            navigation: CRR_USER_NAVIGATION
        },
        {
            userRole: 'BSA',
            navigation: BSA_USER_NAVIGATION
        },
        {
            userRole: 'RET_SUPERVISOR',
            navigation: RET_SUPERVISOR_NAVIGATION
        }
    ]
    // permissions: []
};

export const getLoggedOutState = (): AuthState => ({
    authUser: emptyUser,
    verificationContact: {
        email: '',
        mobileNumber: ''
    },
    isAuthenticated: false,
    step: 'login',
    otpType: 'neutral',
    alertType: null,
    tokenExpiry: null
});

const cookieUser = getUserFromCookie();

export const initialState: AuthState = {
    ...getLoggedOutState(),
    authUser: cookieUser ?? emptyUser,
    isAuthenticated: !!cookieUser
    // isAuthenticated: true
};
