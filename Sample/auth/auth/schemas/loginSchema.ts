import { z as zod } from 'zod';

export const LoginFormSchema = zod.object({
    username: zod.string().nonempty('Username is required'),
    password: zod.string().nonempty('Password is required')
});

export type LoginFormType = zod.infer<typeof LoginFormSchema>;
