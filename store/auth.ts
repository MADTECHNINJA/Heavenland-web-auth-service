import { defineStore } from 'pinia';
import { DataWrapper } from '~/types/DataWrapper.types';
import { logger } from '~/plugins/logger.client';
import { API } from '~/api';
import { JWTDecode } from '~/types/AccessToken.utils';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        decodedToken: new DataWrapper<unknown>(),
        expiresAt: null as number | null,
    }),

    getters: {
        isUserUnauthorized() {
            return this.decodedToken?._error?.statusCode === 401;
        },

        accountId() {
            return this.decodedToken?.data?.sub;
        },
    },

    actions: {
        async storeToken() {
            logger.info('[TOKEN] Fetching user token');

            try {
                const token = await API.AuthService.checkToken();

                const decodedToken = JWTDecode(token.value);

                logger.info('[TOKEN] Token fetched', token, decodedToken);

                this.expiresAt = token.expiresAt;
                this.decodedToken.setData(decodedToken);

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
            } catch (e) {
                logger.error('[TOKEN] Fetching failed with error', e);

                delete axios.defaults.headers.common['Authorization'];

                this.decodedToken.setError(e);
            }
        },

        async logout() {
            logger.info('[TOKEN] Fetching user token');

            try {
                await API.AuthService.logout();

                this.decodedToken.setData(null);
                this.expiresAt = null;

                delete axios.defaults.headers.common['Authorization'];
            } catch (e) {
                logger.error('[TOKEN] Fetching failed with error', e);

                delete axios.defaults.headers.common['Authorization'];

                this.decodedToken.setError(e);
            }
        },
    },
});
