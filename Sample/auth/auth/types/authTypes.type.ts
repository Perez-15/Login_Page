import { GlobalApiResponseTemplate } from '@/app/api/global-api.types';
import { MAIN_MENU_ITEM_IDS, OTHER_ITEM_IDS, SALES_AND_TEAM_ITEM_IDS } from '../constants/navItemIds.const';

// Role / permission / navigation types (owned by the auth session)
export type UserRole =
    | 'OMG_USER'
    | 'OMG_SUPERVISOR'
    | 'CRR'
    | 'RET_SUPERVISOR'
    | 'BSA'
    | 'SALES_REPRESENTATIVE'
    | 'SALES_SUPERVISOR'
    | 'CREDIT_INVESTIGATOR'
    | 'DEBUG';

export type PermissionKey = 'cam:create' | 'user:create' | 'userRole:create' | 'userRolePermission:create';

export type MainMenuItemIds = (typeof MAIN_MENU_ITEM_IDS)[keyof typeof MAIN_MENU_ITEM_IDS];
export type SalesAndTeamItemIds = (typeof SALES_AND_TEAM_ITEM_IDS)[keyof typeof SALES_AND_TEAM_ITEM_IDS];
export type OtherItemIds = (typeof OTHER_ITEM_IDS)[keyof typeof OTHER_ITEM_IDS];

export type AllowedNavigation = {
    mainMenu: MainMenuItemIds[];
    salesAndTeam: SalesAndTeamItemIds[];
    other: OtherItemIds[];
};

export type RoleAllowedNavigations = {
    userRole: UserRole;
    navigation: AllowedNavigation;
};

// Object types
export type MFAResponseData = {
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    username: string;
    mode: string;
    tokenExpiry: string;
};

export type ForgetPasswordResponseData = {
    userId: string;
    mode: string;
    tokenExpiry: string;
};

export type VerifyOtpForgotPasswordResponseData = {
    userId: string;
    mode: string;
    tokenExpiry: string;
};

export type ChangePasswordTransactionType = 'ForgotPassword' | 'ExpiredPassword' | 'ChangePassword';
export type VerifyOTPTransactionType = 'ForgotPassword';
export type ContactType = 'Email' | 'Mobile' | 'Landline';

export type ModuleData = {
    moduleKey: string;
    moduleName: string;
};

export type MainRoleData = {
    userRoleId: string;
    roleId: string;
    roleCode: UserRole;
    roleName: string;
};

export type AdditionalRoleData = MainRoleData & {
    effectiveFrom: string | null;
    effectiveUntil: string | null;
};

export type AuthRoleData = MainRoleData | AdditionalRoleData;
export type AuthRoleWithMainFlag = AuthRoleData & {
    isMainRole: boolean;
};

export type LocationScopeData = {
    id: string;
    name: string;
};

export type AfterLoginUserData = {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    email: string;
    userStatus: string;
    locationScope: {
        divisions: LocationScopeData[];
        clusters: LocationScopeData[];
        zones: LocationScopeData[];
        branches: LocationScopeData[];
    };
};

export type AfterLoginData = {
    user: AfterLoginUserData;
    roles: {
        mainRole: MainRoleData;
        additionalRoles: AdditionalRoleData[];
    };
    modules: ModuleData[];
};

//* Payload types
export type ILoginPayload = {
    username: string;
    password: string;
    cfToken?: string;
};

export type IVerificationSelectionPayload = {
    method: number;
};

export type IMFACheckPayload = {
    OTP: string;
    CFTOKEN: string;
};

export type IFirstLoginPayload = {
    password: string;
};

export type IForgotPasswordMobilePayload = {
    contactType: ContactType;
    mobile: string;
};

export type IForgotPasswordEmailPayload = {
    contactType: ContactType;
    email: string;
};

export type IVerifyOtpForgotPasswordPayload = {
    transaction: VerifyOTPTransactionType;
    otp: string;
    cfToken: string;
};

export type IResetPasswordPayload = IFirstLoginPayload & {
    transaction: ChangePasswordTransactionType;
};

//* Response types
export interface ILoginResponse extends GlobalApiResponseTemplate<{
    mobileNumber: string;
    email: string;
    message: string;
}> {}

export interface IVerificationSelectionResponse extends GlobalApiResponseTemplate<string> {}

export interface IMFACheckResponse extends GlobalApiResponseTemplate<MFAResponseData> {}
export interface IFirstLoginResponse extends GlobalApiResponseTemplate<null> {}
export interface IForgotPasswordResponse extends GlobalApiResponseTemplate<ForgetPasswordResponseData> {}
export interface IVerifyOtpForgotPasswordResponse extends GlobalApiResponseTemplate<VerifyOtpForgotPasswordResponseData> {}
export interface IResetPasswordResponse extends GlobalApiResponseTemplate<null> {}

export interface IAfterLoginResponse extends GlobalApiResponseTemplate<AfterLoginData> {}
