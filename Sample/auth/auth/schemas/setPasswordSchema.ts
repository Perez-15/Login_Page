import { z as zod } from 'zod';

const passwordSchema = zod
    .string()
    .nonempty('Password is required')
    .refine((value) => value.length >= 8 && value.length <= 16, {
        message: 'Password must be between 8 and 16 characters'
    })
    .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter'
    })
    .refine((value) => /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase letter'
    })
    .refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one number'
    })
    .refine((value) => /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/.test(value), {
        message: 'Password contains invalid characters'
    });

export const SetPasswordSchema = zod
    .object({
        password: passwordSchema,
        confirmPassword: zod.string().nonempty('Please confirm your password')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

export type SetPasswordFormType = zod.infer<typeof SetPasswordSchema>;
