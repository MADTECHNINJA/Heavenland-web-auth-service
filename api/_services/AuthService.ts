import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path, SubPath } from '@/api/resources';
import { AuthLoginResponse, AuthLoginResponseSchema, AuthLoginSignaturePayload } from '~/types/Auth.types';
import { AccessToken, AccessTokenSchema } from '~/types/AccessToken.types';

class AuthService {
    async loginWithSignature(payload: AuthLoginSignaturePayload): Promise<AuthLoginResponse> {
        await logger.info('[API]', 'AuthService', 'login', payload);

        const data = (await axios.post(`idm/${Path.AUTH}/${SubPath.AUTH.LOGIN}`, payload)).data;

        return AuthLoginResponseSchema.parse(data);
    }

    async checkToken(): Promise<AccessToken> {
        await logger.info('[API]', 'AuthService', 'accessToken');

        const data = (
            await axios.post(`idm/${Path.AUTH}/${SubPath.AUTH.ACCESS_TOKEN}`, undefined, {
                withCredentials: true,
            })
        ).data?.accessToken;

        return AccessTokenSchema.parse(data);
    }

    async logout(): Promise<void> {
        await logger.info('[API]', 'AuthService', 'logout');

        return await axios.delete(`idm/${Path.AUTH}/${SubPath.AUTH.LOGIN}`, {
            withCredentials: true,
        });
    }
}

export default new AuthService();
