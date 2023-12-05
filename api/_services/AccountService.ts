import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path, SubPath } from '@/api/resources';
import {
    CheckAccountExistenceParams,
    CheckAccountExistenceResponse,
    CheckAccountExistenceResponseSchema,
} from '~/types/Account.types';

class AccountService {
    async checkAccountExistence(params: CheckAccountExistenceParams): Promise<CheckAccountExistenceResponse> {
        await logger.info('[API]', 'AccountService', 'checkAccountExistence', params);

        const data = (await axios.post(`${Path.IDM}/${SubPath.IDM.CHECK_ACCOUNT_EXISTENCE}`, params)).data;

        return CheckAccountExistenceResponseSchema.parse(data);
    }
}

export default new AccountService();
