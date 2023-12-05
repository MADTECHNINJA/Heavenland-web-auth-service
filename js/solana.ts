import { Connection } from '@solana/web3.js';

export class Solana {
    private static instance?: Solana;

    public static getInstance(): Solana {
        if (!Solana.instance) {
            Solana.instance = new Solana();
        }

        return Solana.instance;
    }

    connection?: Connection;

    constructor() {
        if (import.meta.env.VITE_HL_CONNECTION_CLUSTER !== undefined) {
            this.connection = new Connection(import.meta.env.VITE_HL_CONNECTION_CLUSTER);
        }
    }

    getLatestBlockhash = async () => {
        return (await this.connection.getLatestBlockhash('finalized'))?.blockhash;
    };
}
