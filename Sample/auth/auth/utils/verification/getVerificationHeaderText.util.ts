import { OtpType } from '@/features/auth/store/auth/authSlice.type';

type getVerificationHeaderTextProps = {
    codeType: OtpType;
};

export function getVerificationHeaderText({ codeType }: getVerificationHeaderTextProps) {
    switch (codeType) {
        case 'email':
        case 'email_forgot':
            return {
                subtitle: "We've sent you an email.",
                message: "We've sent you a code on your email."
            };

        case 'sms':
        case 'sms_forgot':
            return {
                subtitle: "We've sent you an SMS.",
                message: "We've sent you a code on your SMS."
            };

        case 'neutral':
            return {
                subtitle: "We've previously sent you a code.",
                message: 'Please check your email or SMS for the existing code.'
            };

        default:
            return {
                subtitle: '',
                message: ''
            };
    }
}
