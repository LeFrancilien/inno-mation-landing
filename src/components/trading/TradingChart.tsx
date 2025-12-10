"use client";

import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi, CandlestickData } from "lightweight-charts";
import { formatPrice, formatPercentage } from "@/lib/i18n";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingChartProps {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    candles: Array<{
        time: number;
        open: number;
        high: number;
        low: number;
        close: number;
    }>;
}

export function TradingChart({
    symbol,
    name,
    price,
    change,
    changePercent,
    candles,
}: TradingChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    const isPositive = change >= 0;

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: "#18181b" },
                textColor: "#a1a1aa",
            },
            grid: {
                vertLines: { color: "#27272a" },
                horzLines: { color: "#27272a" },
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            rightPriceScale: {
                borderColor: "#27272a",
            },
            crosshair: {
                vertLine: {
                    color: "#22c55e",
                    width: 1,
                    style: 3,
                },
                horzLine: {
                    color: "#22c55e",
                    width: 1,
                    style: 3,
                },
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#22c55e",
            downColor: "#ef4444",
            borderUpColor: "#22c55e",
            borderDownColor: "#ef4444",
            wickUpColor: "#22c55e",
            wickDownColor: "#ef4444",
        });

        chartRef.current = chart;
        candlestickSeriesRef.current = candlestickSeries;

        // Handle resize
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    // Update data when candles change
    useEffect(() => {
        if (candlestickSeriesRef.current && candles.length > 0) {
            const formattedCandles: CandlestickData[] = candles.map((candle) => ({
                time: candle.time as any,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            }));

            candlestickSeriesRef.current.setData(formattedCandles);
            chartRef.current?.timeScale().fitContent();
        }
    }, [candles]);

    return (
        <div className="bg-[--surface] border border-[--border] rounded-lg p-6">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-[--text-main]">{symbol}</h2>
                            <span className="text-sm text-[--text-muted]">{name}</span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[--text-main]">
                                {formatPrice(price)}
                            </span>
                            <div
                                className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-[--success]" : "text-[--danger]"
                                    }`}
                            >
                                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                <span>{formatPrice(Math.abs(change))}</span>
                                <span>({formatPercentage(changePercent)})</span>
                            </div>
                        </div>
                    </div>

                    {/* Time Range Buttons */}
                    <div className="flex gap-1">
                        {["1J", "1S", "1M", "3M", "1A"].map((range) => (
                            <button
                                key={range}
                                className="px-3 py-1.5 text-xs font-medium text-[--text-muted] hover:text-[--text-main] hover:bg-[--surface-hover] rounded transition-colors"
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div ref={chartContainerRef} className="w-full" />
        </div>
    );
}
