import { useWallet } from 'solana-wallets-vue';
import { useAuthStore } from '~/store/auth';
import { computed } from 'vue';

export const useAuth = () => {
    const { publicKey } = useWallet();
    const authStore = useAuthStore();

    const heavenlandId = computed(() => {
        return authStore.decodedToken.data?.['sub'];
    });

    const isConnected = computed(() => {
        return publicKey.value !== null;
    });

    const isVerified = computed(() => {
        return authStore.decodedToken.data;
    });

    const isVerificationPending = computed(() => {
        return !authStore.decodedToken.fetched;
    });

    const isVerificationError = computed(() => {
        return authStore.decodedToken.error;
    });

    return {
        walletPk: publicKey,
        isConnected,
        isVerified,
        isVerificationPending,
        isVerificationError,
        heavenlandId,
    };
};
