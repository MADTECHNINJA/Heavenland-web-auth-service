import { computed } from '#imports';
import { ClientType } from '~/types/URL.types';
import { useRoute } from '#app';

export default () => {
    const route = useRoute();

    const clientQuery = computed(() => {
        const clientQuery = route.query?.['client'];

        switch (clientQuery) {
            case ClientType.WEBAPP:
                return clientQuery;

            default:
                return null;
        }
    });

    const isCorrectAuthParams = computed(() => {
        switch (clientQuery.value) {
            case ClientType.WEBAPP:
                return redirectQuery.value ?? false;

            default:
                return false;
        }
    });

    const isWebAppClient = computed(() => {
        return clientQuery.value === ClientType.WEBAPP;
    });

    const refCode = computed(() => {
        return Array.isArray(route.query?.['refCode'])
            ? route.query?.['refCode']?.[0] ?? null
            : route.query?.['refCode'] ?? null;
    });

    const redirectQuery = computed(() => {
        return Array.isArray(route.query?.['redirectTo'])
            ? route.query?.['redirectTo']?.[0] ?? null
            : route.query?.['redirectTo'] ?? null;
    });

    return { isWebAppClient, redirectTo: redirectQuery, refCode, isCorrectAuthParams };
};
