import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(4)
    .max(10)
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, "Username Must not contain special character");

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.email(),
    password: z.string()
        .min(8, { message: "Password must have atleast 8 characters" })
        .regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g, { message: "Use a strong Password" })
})