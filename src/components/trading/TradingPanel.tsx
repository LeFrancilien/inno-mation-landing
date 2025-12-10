"use client";

import { Asset } from "@/lib/api";
import { formatPrice, formatPercentage, FR_LABELS } from "@/lib/i18n";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingPanelProps {
    asset: Asset | null;
}

export function TradingPanel({ asset }: TradingPanelProps) {
    if (!asset) {
        return (
            <div className="w-80 bg-[--surface] border-l border-[--border] p-6 flex items-center justify-center">
                <p className="text-[--text-muted] text-sm">{FR_LABELS.search}</p>
            </div>
        );
    }

    const isPositive = asset.change >= 0;

    return (
        <div className="w-80 bg-[--surface] border-l border-[--border] p-6 space-y-6">
            {/* Asset Info */}
            <div>
                <h3 className="text-xl font-bold text-[--text-main]">{asset.symbol}</h3>
                <p className="text-sm text-[--text-muted]">{asset.name}</p>
                <div className="mt-3">
                    <p className="text-3xl font-bold text-[--text-main]">
                        {formatPrice(asset.price)}
                    </p>
                    <div className={`flex items-center gap-2 mt-1 ${isPositive ? "text-[--success]" : "text-[--danger]"}`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="text-sm font-medium">
                            {formatPercentage(asset.changePercent)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Trading Form */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <button className="px-4 py-2 text-sm font-medium bg-[--primary] text-[--background] rounded-lg hover:bg-[--primary-hover] transition-colors">
                        {FR_LABELS.buy}
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-[--danger] text-white rounded-lg hover:bg-[--danger]/90 transition-colors">
                        {FR_LABELS.sell}
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-[--text-muted] block mb-1">
                            {FR_LABELS.quantity}
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg text-[--text-main] focus:border-[--primary] focus:outline-none"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-[--text-muted] block mb-1">
                            {FR_LABELS.price}
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg text-[--text-main] focus:border-[--primary] focus:outline-none"
                            value={asset.price.toFixed(2)}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="text-xs text-[--text-muted] block mb-1">
                            {FR_LABELS.total}
                        </label>
                        <div className="px-4 py-2 bg-[--background] border border-[--border] rounded-lg text-[--text-main]">
                            $0.00
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Stats */}
            <div className="border-t border-[--border] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-[--text-muted]">{FR_LABELS.high24h}</span>
                    <span className="text-[--text-main] font-medium">{formatPrice(asset.high)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[--text-muted]">{FR_LABELS.low24h}</span>
                    <span className="text-[--text-main] font-medium">{formatPrice(asset.low)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[--text-muted]">{FR_LABELS.volume}</span>
                    <span className="text-[--text-main] font-medium">
                        {new Intl.NumberFormat("fr-FR", { notation: "compact" }).format(asset.volume)}
                    </span>
                </div>
                {asset.marketCap && (
                    <div className="flex justify-between text-sm">
                        <span className="text-[--text-muted]">{FR_LABELS.marketCap}</span>
                        <span className="text-[--text-main] font-medium">
                            {new Intl.NumberFormat("fr-FR", { notation: "compact", style: "currency", currency: "USD" }).format(asset.marketCap)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
