import {
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    Connection,
    PublicKey,
} from "@solana/web3.js";

import { getKeypairFromEnvironment, getKeypairFromFile } from "@solana-developers/helpers";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const publicKey = new PublicKey(keypair.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"));

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Finished! You have ${balanceInSol} SOL at ${publicKey} address!`);