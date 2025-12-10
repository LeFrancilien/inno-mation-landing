"use client";

import { AssetClass } from "@/lib/api";
import { FR_LABELS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface AssetClassTabsProps {
    activeClass: AssetClass;
    onChange: (assetClass: AssetClass) => void;
}

const ASSET_CLASSES: AssetClass[] = ["stocks", "crypto", "forex", "indices", "commodities"];

export function AssetClassTabs({ activeClass, onChange }: AssetClassTabsProps) {
    return (
        <div className="flex items-center gap-1 p-1 bg-[--surface] rounded-lg border border-[--border]">
            {ASSET_CLASSES.map((assetClass) => (
                <button
                    key={assetClass}
                    onClick={() => onChange(assetClass)}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all",
                        activeClass === assetClass
                            ? "bg-[--primary] text-[--background]"
                            : "text-[--text-muted] hover:text-[--text-main] hover:bg-[--surface-hover]"
                    )}
                >
                    {FR_LABELS[assetClass]}
                </button>
            ))}
        </div>
    );
}
