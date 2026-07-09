import { z as zod } from 'zod';

export const VerificationSelectionFormSchema = zod.object({
    otpType: zod.string().nonempty()
});

export const VerificationFormSchema = zod.object({
    otp: zod.string().regex(/^\d{6}$/)
});

export type VerificationSelectionFormType = zod.infer<typeof VerificationSelectionFormSchema>;
export type VerificationFormType = zod.infer<typeof VerificationFormSchema>;
