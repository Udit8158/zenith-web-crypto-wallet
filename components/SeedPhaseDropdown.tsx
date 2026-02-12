"use client";
import { useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface SeedPhaseDropdownProps {
  seedPhase: string;
}

export default function SeedPhaseDropdown({
  seedPhase,
}: SeedPhaseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhase);
      toast.success("Copied to clipboard");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed error: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild className="cursor-pointer">
          <button className="w-full h-12 px-4 py-2 rounded-md border bg-background text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] flex items-center justify-between">
            <span>Secret Recovery Phrase</span>
            <ChevronDown
              className={cn(
                "transition-transform duration-300",
                isOpen && "rotate-180",
              )}
              size={20}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3 overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:max-h-0 data-[state=closed]:opacity-0 data-[state=open]:max-h-250 data-[state=open]:opacity-100">
          <Card className="border-accent border-2">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Your Secret Phase
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Keep this secret 🤫
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {seedPhase.split(" ").map((word, index) => (
                  <Item
                    variant="muted"
                    className="cursor-pointer hover:bg-accent transition-all duration-300"
                    key={index}
                  >
                    <ItemTitle className="text-sm sm:text-base md:text-lg">
                      {word}
                    </ItemTitle>
                  </Item>
                ))}
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <div
        className={cn(
          "flex gap-2 items-center justify-center cursor-pointer opacity-60 text-sm hover:opacity-100 transition-all duration-300",
          copied && "text-primary font-medium",
        )}
        onClick={handleCopy}
      >
        <Copy size={16} />
        <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
      </div>
    </div>
  );
}
