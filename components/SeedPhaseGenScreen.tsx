import {
  getPrivatePublicKeyPair,
  seedGenFromMnemonic,
  seedPhaseGen,
  WalletType,
} from "@/app/utils/wallet";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "sonner";

interface SeedPhaseGenScreenProps {
  setSeedPhase: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SeedPhaseGenScreen({
  setSeedPhase,
}: SeedPhaseGenScreenProps) {
  const seedPhaseInputRef = useRef<HTMLInputElement>(null);

  const generateSeedPhaseOnClickHandler = () => {
    const seedPhaseInput = seedPhaseInputRef.current?.value;

    // importing wallet
    if (seedPhaseInput) {
      const { seed, error } = seedGenFromMnemonic(seedPhaseInput);

      if (error) {
        toast.error("Invalid seed phrase");
        return;
      }

      setSeedPhase(seedPhaseInput);
      localStorage.setItem("seed-phase", seedPhaseInput);

      // generate private public key for first wallet
      const pathIndex = 0;

      const solanaDerivationPath = `m/44'/501'/${pathIndex}'/0'`;
      const { privateKey, publicKey } = getPrivatePublicKeyPair(
        solanaDerivationPath,
        seed
      );

      const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
      const newWallet: WalletType = {
        privateKey,
        publicKey,
        path: solanaDerivationPath,
        mnemonic: seedPhaseInput,
      };
      wallets.push(newWallet);

      localStorage.setItem(
        "next-wallet-path-index",
        (pathIndex + 1).toString()
      );
      localStorage.setItem("wallets", JSON.stringify(wallets));

      return;
    }

    // generating fresh wallet from new seed phase
    const { mnemonic, seed } = seedPhaseGen();

    setSeedPhase(mnemonic);
    localStorage.setItem("seed-phase", mnemonic);

    // generate private public key for first wallet
    const pathIndex = 0;

    const solanaDerivationPath = `m/44'/501'/${pathIndex}'/0'`;
    const { privateKey, publicKey } = getPrivatePublicKeyPair(
      solanaDerivationPath,
      seed
    );

    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    const newWallet: WalletType = {
      privateKey,
      publicKey,
      path: solanaDerivationPath,
      mnemonic,
    };
    wallets.push(newWallet);

    localStorage.setItem("next-wallet-path-index", (pathIndex + 1).toString());
    localStorage.setItem("wallets", JSON.stringify(wallets));
  };

  return (
    <div className="flex flex-col gap-2 mx-4 md:mx-12 lg:mx-20 my-12 text-sm">
      <h1 className="font-extrabold text-2xl md:text-4xl ">
        Secret Recovery Phrase
      </h1>
      <p className="opacity-60">Save these words in a safe place.</p>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Field>
          <FieldLabel htmlFor="seedphase-input">Secret phrase</FieldLabel>
          <Input
            id="seedphase-input"
            type="text"
            placeholder="leave a blank space after each word"
            ref={seedPhaseInputRef}
          />
          <FieldDescription>
            Leave it blank to generate a new one
          </FieldDescription>
        </Field>
        <Button
          onClick={generateSeedPhaseOnClickHandler}
          className="cursor-pointer"
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
