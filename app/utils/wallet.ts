import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

export const seedPhaseGen = () => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);

  return { mnemonic, seed };
};

export const getPrivatePublicKeyPair = (path: string, seed: Buffer) => {
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // private key
  const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58(); // public key
  const base58PrivateKey = bs58.encode(privateKey);

  return { privateKey: base58PrivateKey, publicKey };
};

// console.log(getPrivatePublicKeyPair("m/44'/501'/0'/0'", seedPhaseGen().seed));
