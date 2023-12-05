import { z } from 'zod';

export type CheckAccountExistenceParams = {
    signRequestId: string;
    signatureAsJsonArray: string;
    identifier: string;
};

export const CheckAccountExistenceResponseSchema = z.object({
    identifier: z.string(),
    exists: z.boolean(),
});

export type CheckAccountExistenceResponse = z.infer<typeof CheckAccountExistenceResponseSchema>;

export type Account = {
    createdAt: number;
    hasEarlyAccess: boolean;
    id: string;
    isReadyForGameLogin: boolean;
    nickname: string | null;
    username: string | null;
    wallet: string;
};

export type UpdateAccountRequestParams = {
    username?: string;
    nickname?: string;
    password?: string;
    passwordCheck?: string;
    wallet: string;
};

export type SetPasswordAccountRequestParams = Required<Pick<UpdateAccountRequestParams, 'password' | 'passwordCheck'>>;
export type UpdateDataAccountRequestParams = Pick<UpdateAccountRequestParams, 'username' | 'nickname'>;
export type CreateGameAccountRequestParams = Required<
    Pick<UpdateAccountRequestParams, 'username' | 'nickname' | 'password' | 'passwordCheck'>
>;
