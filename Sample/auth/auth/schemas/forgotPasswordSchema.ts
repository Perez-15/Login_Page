import { z as zod } from 'zod';

const forgotPasswordShape = {
    sms: zod.string(),
    email: zod.string()
};

export const createForgotPasswordSchema = (mode: 'sms' | 'email') =>
    zod.object({
        sms:
            mode === 'sms'
                ? forgotPasswordShape.sms.nonempty('Field is required').regex(/^09\d{9}$/, 'Must be a valid SMS number (09XXXXXXXXX)')
                : forgotPasswordShape.sms.optional(),

        email:
            mode === 'email'
                ? forgotPasswordShape.email.nonempty('Field is required').email('Must be a valid email address')
                : forgotPasswordShape.email.optional()
    });

export type ForgotPasswordFormType = zod.infer<ReturnType<typeof createForgotPasswordSchema>>;
