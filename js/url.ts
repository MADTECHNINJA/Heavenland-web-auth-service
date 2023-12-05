export const getTxSolscanUrl = (txSig: string) => {
    const isDevnet = import.meta.env.VITE_HL_MODE === 'development';

    return `https://solscan.io/tx/${txSig}?${isDevnet ? 'cluster=devnet' : ''}`;
};
