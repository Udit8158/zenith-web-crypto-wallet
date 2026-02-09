import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export const seedPhaseGen = () => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);

  return { mnemonic, seed };
};

export const getPrivatePublicKeyPair = (path: string, seed: Buffer) => {
  try {
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // private key
    const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58(); // public key

    return { privateKey, publicKey };
  } catch (error) {
    console.error("Generating private public key pair failed: ", error);
  }
};
