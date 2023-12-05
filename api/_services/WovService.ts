import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path, SubPath } from '@/api/resources';
import { SignRequestSchema, SignRequest } from '~/types/Wov.types';

class WovService {
    async getSignRequests(purpose: string): Promise<SignRequest> {
        await logger.info('[API]', 'WovService', 'getSignRequests', purpose);

        const data = (
            await axios.post(`${Path.WOV}/${SubPath.WOV.SIGN_REQUESTS}`, {
                purpose,
            })
        ).data;

        return SignRequestSchema.parse(data);
    }
}

export default new WovService();
