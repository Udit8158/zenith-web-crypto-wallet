"use client";
import SeedPhaseGenScreen from "@/components/SeedPhaseGenScreen";
import WalletScreen from "@/components/WalletScreen";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [seedPhase, setSeedPhase] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const seedPhaseInLocalStorage = localStorage.getItem("seed-phase");
    setSeedPhase(seedPhaseInLocalStorage);
  }, []);

  // if client component is not mounted, returning a blank screen for a brief ms, instead of the SeedPhaseGenScreen(for better ux)
  // so overally it will be a little delayed but the user experience will be better

  if (!mounted) return <div className="min-h-screen"></div>;

  return (
    <div className="">
      {!seedPhase ? (
        <SeedPhaseGenScreen setSeedPhase={setSeedPhase} />
      ) : (
        <WalletScreen seedPhase={seedPhase} />
      )}
    </div>
  );
}
