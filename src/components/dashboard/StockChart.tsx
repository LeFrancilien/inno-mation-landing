"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { ChartDataPoint } from "@/lib/api";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useState } from "react";

interface StockChartProps {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    data: ChartDataPoint[];
}

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export function StockChart({
    symbol,
    name,
    price,
    change,
    changePercent,
    data,
}: StockChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>("1M");
    const isPositive = change >= 0;

    const timeRanges: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-[--text-main]">{symbol}</h2>
                        <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${isPositive
                                    ? "bg-[--success]/10 text-[--success]"
                                    : "bg-[--danger]/10 text-[--danger]"
                                }`}
                        >
                            {isPositive ? <TrendingUp className="inline w-3 h-3 mr-1" /> : <TrendingDown className="inline w-3 h-3 mr-1" />}
                            {formatPercentage(changePercent)}
                        </span>
                    </div>
                    <p className="text-sm text-[--text-muted] mt-1">{name}</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-[--text-main]">
                        {formatCurrency(price)}
                    </p>
                    <p
                        className={`text-sm font-medium ${isPositive ? "text-[--success]" : "text-[--danger]"
                            }`}
                    >
                        {isPositive ? "+" : ""}
                        {formatCurrency(change)}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {/* Time Range Selector */}
                <div className="flex gap-1 mb-4">
                    {timeRanges.map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? "primary" : "ghost"}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className="px-3 py-1.5 text-xs"
                        >
                            {range}
                        </Button>
                    ))}
                </div>

                {/* Chart */}
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={isPositive ? "#22c55e" : "#ef4444"}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={isPositive ? "#22c55e" : "#ef4444"}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#71717a", fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                domain={["dataMin - 5", "dataMax + 5"]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#71717a", fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#18181b",
                                    border: "1px solid #27272a",
                                    borderRadius: "8px",
                                    color: "#f4f4f5",
                                }}
                                labelStyle={{ color: "#a1a1aa" }}
                                formatter={(value: number) => [formatCurrency(value), "Price"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke={isPositive ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
