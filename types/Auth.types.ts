import { z } from 'zod';

export const AuthLoginSignaturePayloadSchema = z.object({
    type: z.literal('signature'),
    clientType: z.literal('browser'),
    signatureAsJsonArray: z.string(),
    publicKey: z.string(),
    continue: z.string(),
    signRequestId: z.string(),
    referralCode: z.string(),
});

export type AuthLoginSignaturePayload = z.infer<typeof AuthLoginSignaturePayloadSchema>;

export type AuthLoginCredentialsPayload = {
    type: 'credentials';
    username: string;
    password: string;
    clientType: 'game';
};

export const AuthLoginResponseSchema = z.object({
    method: z.enum(['POST', 'PUT']),
    redirectUrl: z.string(),
});

export type AuthLoginResponse = z.infer<typeof AuthLoginResponseSchema>;

export enum EAuthLoginResponseType {
    SUCCESS,
    ERROR,
}
