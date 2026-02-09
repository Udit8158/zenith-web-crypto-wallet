import { Delete } from "lucide-react";

interface WalletProps {
  privateKey: string;
  publicKey: string;
}

export default function Wallet({ publicKey, privateKey }: WalletProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md border-accent border-2">
      <div className="flex justify-between items-center p-4">
        <p className="text-2xl md:text-4xl font-bold">Wallet 1</p>
        <Delete size={16} color="red" />
      </div>
      <div className="bg-accent flex flex-col gap-6 p-4 rounded-t-2xl">
        <div className="flex flex-col gap-1">
          <p className="text-lg md:text-2xl font-bold">Public Key</p>
          <p className="text-sm md:text-lg opacity-70 truncate">{publicKey}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg md:text-2xl font-bold">Private Key</p>
          <p className="text-sm md:text-lg opacity-70 break-all">
            {privateKey}
          </p>
        </div>
      </div>
    </div>
  );
}
