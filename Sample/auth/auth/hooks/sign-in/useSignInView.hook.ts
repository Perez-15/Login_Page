import { useAppSelector } from '@/app/hooks';

export function useSignInView() {
    const currentStep = useAppSelector((state) => state.auth.step);
    const alertType = useAppSelector((state) => state.auth.alertType);

    return {
        currentStep,
        alertType
    };
}
