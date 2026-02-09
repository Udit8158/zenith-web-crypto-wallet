import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export const seedPhaseGen = () => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);

  return { mnemonic, seed };
};
