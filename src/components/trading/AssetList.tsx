"use client";

import { Asset, ForexRate, IndexData, CommodityData } from "@/lib/api";
import { formatPrice, formatPercentage, FR_LABELS } from "@/lib/i18n";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";

type MarketAsset = Asset | ForexRate | IndexData | CommodityData;

interface AssetListProps {
    assets: MarketAsset[];
    selectedSymbol?: string;
    onSelect: (symbol: string) => void;
}

export function AssetList({ assets, selectedSymbol, onSelect }: AssetListProps) {
    if (!assets || assets.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-[--text-muted] text-sm">{FR_LABELS.noData}</p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-1 p-2">
                {assets.map((asset) => {
                    const symbol = "symbol" in asset ? asset.symbol : "pair" in asset ? asset.pair : "";
                    const name = asset.name;
                    const price = "price" in asset ? asset.price : "rate" in asset ? asset.rate : "value" in asset ? asset.value : 0;
                    const changePercent = asset.changePercent;
                    const isPositive = changePercent >= 0;
                    const isSelected = symbol === selectedSymbol;

                    return (
                        <button
                            key={symbol}
                            onClick={() => onSelect(symbol)}
                            className={`w-full p-3 rounded-lg text-left transition-colors ${isSelected
                                    ? "bg-[--primary]/10 border border-[--primary]"
                                    : "bg-[--background] border border-[--border] hover:bg-[--surface-hover]"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[--text-main] truncate">{symbol}</p>
                                    <p className="text-xs text-[--text-muted] truncate">{name}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="font-medium text-[--text-main]">
                                        {formatPrice(price)}
                                    </p>
                                    <div className={`flex items-center justify-end gap-1 text-xs font-medium ${isPositive ? "text-[--success]" : "text-[--danger]"
                                        }`}>
                                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {formatPercentage(changePercent)}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
