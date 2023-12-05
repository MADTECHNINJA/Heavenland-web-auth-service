import { useWallet } from 'solana-wallets-vue';

export const signMessage = async (message: string) => {
    const { signMessage, publicKey } = useWallet();

    if (!publicKey.value) {
        throw new Error('not connected');
    }

    if (!signMessage) {
        throw new Error('not supported: message signing');
    }

    const encodedMessage = new TextEncoder().encode(message);

    const signature = await signMessage.value(encodedMessage);

    if (!signature) {
        throw new Error('not valid: signature');
    }

    return signature;
};
