"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { CryptoData } from "@/lib/api";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoSectionProps {
    cryptos: CryptoData[];
}

function MiniSparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data
        .map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - min) / range) * 100;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg className="w-24 h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke={isPositive ? "#22c55e" : "#ef4444"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

export function CryptoSection({ cryptos }: CryptoSectionProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[--text-main]">Crypto Market</h3>
                    <span className="text-xs text-[--text-dim]">24h Change</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {cryptos.map((crypto) => {
                    const isPositive = crypto.change24h >= 0;
                    return (
                        <div
                            key={crypto.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-[--background] border border-[--border] hover:bg-[--surface-hover] transition-colors cursor-pointer"
                        >
                            {/* Left: Icon & Name */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--primary]/20 to-[--primary]/5 flex items-center justify-center text-sm font-bold text-[--primary]">
                                    {crypto.symbol.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-[--text-main]">{crypto.name}</p>
                                    <p className="text-xs text-[--text-muted]">{crypto.symbol}</p>
                                </div>
                            </div>

                            {/* Center: Sparkline */}
                            <div className="hidden sm:block">
                                <MiniSparkline data={crypto.sparkline} isPositive={isPositive} />
                            </div>

                            {/* Right: Price & Change */}
                            <div className="text-right">
                                <p className="font-semibold text-[--text-main]">
                                    {formatCurrency(crypto.price)}
                                </p>
                                <div
                                    className={`flex items-center justify-end gap-1 text-sm ${isPositive ? "text-[--success]" : "text-[--danger]"
                                        }`}
                                >
                                    {isPositive ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {formatPercentage(crypto.change24h)}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Market Cap Summary */}
                <div className="pt-3 mt-3 border-t border-[--border]">
                    <div className="flex justify-between text-xs text-[--text-muted]">
                        <span>Total Market Cap</span>
                        <span className="font-medium text-[--text-main]">
                            ${formatNumber(cryptos.reduce((acc, c) => acc + c.marketCap, 0))}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
