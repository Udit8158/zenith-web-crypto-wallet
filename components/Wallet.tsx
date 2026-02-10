"use client";

import { Copy, Delete, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AlertPrivateKeyVisible from "./AlertPrivateKeyVisible";
import { WalletType } from "@/app/utils/wallet";

interface WalletProps {
  privateKey: string;
  publicKey: string;
  titleIndex: number;
  wallets: WalletType[];
  setWallets: React.Dispatch<React.SetStateAction<WalletType[]>>;
  //   setWallets: (wallets: WalletType[]) => void;
}

export default function Wallet({
  publicKey,
  privateKey,
  titleIndex,
  wallets,
  setWallets,
}: WalletProps) {
  const [fullPublicKeyVisible, setFullPublicKeyVisible] = useState(false);
  const [fullPrivateKeyVisible, setFullPrivateKeyVisible] = useState(false);

  const [showAlertPrivateKeyModal, setShowAlertPrivateKeyModal] =
    useState(false);

  const visiblePublicKeyOnUI =
    publicKey.slice(0, 6) + "..." + publicKey.slice(-6);

  const visiblePrivateKeyOnUI =
    privateKey.slice(0, 6) + "..." + privateKey.slice(-6);

  const handleCopy = (key: "publicKey" | "privateKey") => {
    key === "publicKey"
      ? navigator.clipboard.writeText(publicKey)
      : navigator.clipboard.writeText(privateKey);

    toast.success(
      `${key === "publicKey" ? "Public key" : "Private key"} copied to clipboard`
    );
  };

  const handleDeleteWallet = () => {
    // const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");

    const newWallets = wallets.filter(
      (wallet: WalletType) => wallet.publicKey !== publicKey
    );

    setWallets(newWallets); // for rendering in ui
    localStorage.setItem("wallets", JSON.stringify(newWallets));
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border-accent border-2">
      <AlertPrivateKeyVisible
        showModal={showAlertPrivateKeyModal}
        setShowModal={setShowAlertPrivateKeyModal}
        setFullPrivateKeyVisible={setFullPrivateKeyVisible}
      />
      <div className="flex justify-between items-center p-4">
        <p className="text-2xl md:text-4xl font-bold">Wallet {titleIndex}</p>

        <Trash2Icon
          size={20}
          color="red"
          className="cursor-pointer hover:opacity-70 transition-all duration-300"
          onClick={handleDeleteWallet}
        />
      </div>
      <div className="bg-accent flex flex-col gap-6 p-4 rounded-t-2xl">
        {/* Public key */}
        <div className="flex flex-col gap-1">
          <p className="text-lg md:text-2xl font-bold">Public Key</p>
          <div className="flex justify-between items-center gap-8">
            <p
              className="text-sm md:text-lg opacity-70 break-all cursor-pointer hover:opacity-100 transition-all duration-300"
              onClick={() => {
                setFullPublicKeyVisible(!fullPublicKeyVisible);
                handleCopy("publicKey");
              }}
            >
              {fullPublicKeyVisible ? publicKey : visiblePublicKeyOnUI}
            </p>

            <div>
              <Copy
                size={20}
                height={20}
                className="cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
                onClick={() => handleCopy("publicKey")}
              />
            </div>
          </div>
        </div>
        {/* Private key */}
        <div className="flex flex-col gap-1">
          <p className="text-lg md:text-2xl font-bold">Private Key</p>
          <div className="flex justify-between items-start gap-8">
            <p
              className="text-sm md:text-lg opacity-70 break-all cursor-pointer hover:opacity-100 transition-all duration-300 "
              onClick={() => {
                handleCopy("privateKey");

                if (!fullPrivateKeyVisible) {
                  setShowAlertPrivateKeyModal(true);
                } else {
                  setFullPrivateKeyVisible(false);
                }
              }}
            >
              {fullPrivateKeyVisible ? privateKey : visiblePrivateKeyOnUI}
            </p>

            <div>
              <Copy
                size={20}
                className="cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
                onClick={() => handleCopy("privateKey")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
