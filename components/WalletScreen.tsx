"use client";
import { useEffect, useState } from "react";
import { Item, ItemTitle } from "./ui/item";
import { Copy } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Wallet from "./Wallet";
import { getPrivatePublicKeyPair, WalletType } from "@/app/utils/wallet";
import { mnemonicToSeedSync } from "bip39";

interface WalletScreenProps {
  seedPhase: string;
}

interface Wallet {
  privateKey: string;
  publicKey: string;
  path: string;
  mnemonic: string;
}

export default function WalletScreen({ seedPhase }: WalletScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [wallets, setWallets] = useState<Array<Wallet>>([]);

  useEffect(() => {
    setMounted(true);

    // get the wallets from local storage
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    setWallets(wallets);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhase);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed error: ", error);
    }
  };

  const addWalletHandler = () => {
    try {
      const pathIndex = parseInt(
        localStorage.getItem("next-wallet-path-index") || "0"
      );

      const solanaDerivationPath = `m/44'/501'/${pathIndex}'/0'`;
      const seed = mnemonicToSeedSync(seedPhase);
      const { privateKey, publicKey } = getPrivatePublicKeyPair(
        solanaDerivationPath,
        seed
      );

      const newWallet: WalletType = {
        path: solanaDerivationPath,
        mnemonic: seedPhase,
        privateKey,
        publicKey,
      };

      setWallets((prev) => [...prev, newWallet]);
      localStorage.setItem("wallets", JSON.stringify([...wallets, newWallet]));

      //   increment the path index
      localStorage.setItem(
        "next-wallet-path-index",
        (pathIndex + 1).toString()
      );

      toast.success("Wallet added successfully");
    } catch (error) {
      toast.error("Failed to add wallet");
      console.error("Add wallet error: ", error);
    }
  };

  if (!mounted) return <div className="min-h-screen"></div>;

  return (
    <div className="py-12 px-8 md:px-14 lg:px-50 xl:px-70 flex flex-col gap-4">
      <div className="border-accent border-2 p-8 rounded-md flex flex-col gap-4">
        <div className="">
          <h1 className="font-extrabold text-2xl md:text-4xl">
            Your secret phase
          </h1>
          <p className="opacity-60 text-sm">Keep this secret 🤫</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {seedPhase.split(" ").map((word, index) => {
            return (
              <Item
                variant={"muted"}
                className="cursor-pointer hover:bg-accent transition-all duration-300"
                key={index}
              >
                <ItemTitle className="md:text-lg lg:text-xl">{word}</ItemTitle>
              </Item>
            );
          })}
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer opacity-60 text-sm hover:opacity-100 transition-all duration-300"
          onClick={handleCopy}
        >
          <Copy size={16} />
          <p>Copy to clipboard</p>
        </div>
      </div>

      {/* Wallets */}
      <div className="my-12 flex flex-col gap-4 md:gap-12">
        <div className="flex flex-col md:flex-row gap-4 md:gap-1 md:items-center md:justify-between">
          <h1 className="font-extrabold text-4xl md:text-4xl">Solana Wallet</h1>
          <div className="flex gap-8 md:gap-2 items-center">
            <Button onClick={addWalletHandler}>Add Wallet</Button>
            <Button variant={"destructive"}>Clear Wallets</Button>
          </div>
        </div>
        {wallets.map((wallet, index) => {
          return (
            <Wallet
              key={index}
              wallets={wallets}
              setWallets={setWallets}
              privateKey={wallet.privateKey}
              publicKey={wallet.publicKey}
              titleIndex={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
