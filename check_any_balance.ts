import {
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    Connection,
    PublicKey,
    Cluster,
} from "@solana/web3.js";

import { getKeypairFromEnvironment, getKeypairFromFile } from "@solana-developers/helpers";

//Args are -> [2] - type of network [3] - address
//TODO - create name resolver for short names such as toly.sol

const suppliedClusterName = process.argv[2];

let net: Cluster = "devnet";

if (suppliedClusterName === "devnet" || suppliedClusterName === "mainnet-beta") {
    net = suppliedClusterName;
} else {
    console.log("Illegal Net name -> Default Net -> devnet!");
}

const realNet: Cluster = net;

const suppliedPublicKey = process.argv[3];

if (!suppliedPublicKey) {
    throw new Error ("Please provide a public key to check balance!");
}

const publicKey = new PublicKey(suppliedPublicKey);

const connection = new Connection(clusterApiUrl(realNet));

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Finished! ${balanceInSol} SOL at ${publicKey} address!`);