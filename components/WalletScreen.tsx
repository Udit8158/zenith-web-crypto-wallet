"use client";
import { useEffect, useState } from "react";
import { Item, ItemTitle } from "./ui/item";
import { Copy, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Wallet from "./Wallet";
import { getPrivatePublicKeyPair, WalletType } from "@/app/utils/wallet";
import { mnemonicToSeedSync } from "bip39";
import AlertDialogModal from "./AlertDialogModal";

interface WalletScreenProps {
  seedPhase: string;
  setSeedPhase: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Wallet {
  privateKey: string;
  publicKey: string;
  path: string;
  mnemonic: string;
}

export default function WalletScreen({
  seedPhase,
  setSeedPhase,
}: WalletScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [wallets, setWallets] = useState<Array<Wallet>>([]);

  const [showClearWalletsModal, setShowClearWalletsModal] = useState(false);

  useEffect(() => {
    setMounted(true);

    // get the wallets from local storage
    const savedWallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    setWallets(savedWallets);
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

      localStorage.setItem("wallets", JSON.stringify([...wallets, newWallet]));

      //   increment the path index
      localStorage.setItem(
        "next-wallet-path-index",
        (pathIndex + 1).toString()
      );

      setWallets((prev) => [...prev, newWallet]);
      toast.success("Wallet added successfully");
    } catch (error) {
      toast.error("Failed to add wallet");
      console.error("Add wallet error: ", error);
    }
  };

  const clearWalletsHandler = () => {
    try {
      localStorage.setItem("wallets", JSON.stringify([]));
      setShowClearWalletsModal(true);
      setWallets([]);
      toast.success("Wallets cleared successfully");
    } catch (error) {
      toast.error("Failed to clear wallets");
      console.error("Add wallet error: ", error);
    }
  };

  if (!mounted) return <div className="min-h-screen"></div>;

  return (
    <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-14 lg:px-50 xl:px-70 flex flex-col gap-4">
      <div className="border-accent border-2 p-4 sm:p-6 md:p-8 rounded-md flex flex-col gap-4">
        <div className="">
          <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl">
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
                <ItemTitle className="text-sm sm:text-base md:text-lg">{word}</ItemTitle>
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
        <AlertDialogModal
          alertDialogTitle="Delete the seed phase too?"
          alertDialogDescription="Your wallets are deleted, would you like to delete the seed phase too?"
          showModal={showClearWalletsModal}
          setShowModal={setShowClearWalletsModal}
          actionButtonName="Delete"
          cancelButtonName="No"
          icon={<Trash2Icon />}
          actionFunction={() => {
            localStorage.clear();
            setSeedPhase(null); // to re rerender the paraten (page.tsx) to move back to the seed phase screen
          }}
        />
        <div className="flex flex-col md:flex-row gap-4 md:gap-1 md:items-center md:justify-between">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
            Your Solana Wallets
          </h1>
          <div className="flex gap-8 md:gap-2 items-center">
            <Button onClick={addWalletHandler}>Add Wallet</Button>
            {wallets.length === 0 ? (
              <Button variant={"destructive"} disabled>
                Clear Wallets
              </Button>
            ) : (
              <Button variant={"destructive"} onClick={clearWalletsHandler}>
                Clear Wallets
              </Button>
            )}
          </div>
        </div>

        {wallets.length === 0 && (
          <p className="text-center opacity-60">No wallets yet</p>
        )}

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
