export const AUTH_ENDPOINTS = {
    login: '/CRM/Auth/Login',
    verificationSelection: '/CRM/Auth/LoginMFA',
    otpVerification: '/CRM/Auth/LoginMFACheck',
    firstLogin: '/CRM/Auth/FirstLogin',
    forgotPassword: '/CRM/User/ForgotPassword',
    afterLogin: '/CRM/RBAC/Authorization',
    verifyOtpForgotPassword: '/CRM/User/VerifyOTP',
    changePassword: '/CRM/User/ChangePassword',
    logout: '/CRM/Auth/Logout'
} as const;
