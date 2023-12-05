import { z } from 'zod';

export type SignRequest = z.infer<typeof SignRequestSchema>;

export const SignRequestSchema = z.object({
    headers: z.string(),
    id: z.string(),
    ip: z.string(),
    publicKey: z.string().nullable(),
    purpose: z.string(),
    rawMessage: z.string(),
    signature: z.string().nullable(),
    successful: z.boolean().nullable(),
    usable: z.boolean(),
    usedBy: z.string().nullable(),
});
