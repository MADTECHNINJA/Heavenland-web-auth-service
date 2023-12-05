import { z } from 'zod';

export const AccessTokenSchema = z.object({
    value: z.string(),
    expiresAt: z.number(),
});

export type AccessToken = z.infer<typeof AccessTokenSchema>;
