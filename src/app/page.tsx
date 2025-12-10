"use client";

import { Header } from "@/components/dashboard/Header";
import { AssetClassTabs } from "@/components/trading/AssetClassTabs";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { AssetList } from "@/components/trading/AssetList";
import { TradingChart } from "@/components/trading/TradingChart";
import {
  Asset,
  AssetClass,
  fetchStockQuote,
  fetchCryptoData,
  fetchForexRates,
  fetchIndices,
  fetchCommodities,
  fetchCandles,
  Candle,
  ForexRate,
  IndexData,
  CommodityData,
} from "@/lib/api";
import { useState, useEffect } from "react";

type MarketAsset = Asset | ForexRate | IndexData | CommodityData;

export default function TradingPage() {
  const [assetClass, setAssetClass] = useState<AssetClass>("stocks");
  const [assets, setAssets] = useState<MarketAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load assets when asset class changes
  useEffect(() => {
    loadAssets();
  }, [assetClass]);

  // Load initial asset
  useEffect(() => {
    if (assets.length > 0 && !selectedAsset) {
      const firstAsset = assets[0];
      if ("symbol" in firstAsset) {
        handleAssetSelect(firstAsset.symbol);
      } else if ("pair" in firstAsset) {
        handleAssetSelect(firstAsset.pair);
      }
    }
  }, [assets]);

  async function loadAssets() {
    setIsLoading(true);
    try {
      let data: MarketAsset[] = [];

      switch (assetClass) {
        case "stocks":
          // Load popular stocks
          const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NVDA"];
          data = await Promise.all(
            stockSymbols.map(symbol => fetchStockQuote(symbol).catch(() => null))
          ).then(results => results.filter((r): r is Asset => r !== null));
          break;
        case "crypto":
          data = await fetchCryptoData();
          break;
        case "forex":
          data = await fetchForexRates();
          break;
        case "indices":
          data = await fetchIndices();
          break;
        case "commodities":
          data = await fetchCommodities();
          break;
      }

      setAssets(data);
    } catch (error) {
      console.error("Error loading assets:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAssetSelect(symbol: string) {
    try {
      if (assetClass === "stocks" || assetClass === "crypto") {
        const quote = await fetchStockQuote(symbol);
        setSelectedAsset(quote);

        // Fetch candle data for the chart
        const candleData = await fetchCandles(symbol, "D");
        setCandles(candleData);
      }
    } catch (error) {
      console.error("Error selecting asset:", error);
    }
  }

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 1 && assetClass === "stocks") {
      const timeout = setTimeout(async () => {
        try {
          const quote = await fetchStockQuote(searchQuery.toUpperCase());
          setSelectedAsset(quote);
          const candleData = await fetchCandles(searchQuery.toUpperCase(), "D");
          setCandles(candleData);
        } catch (error) {
          console.error("Search error:", error);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchQuery, assetClass]);

  return (
    <div className="min-h-screen bg-[--background]">
      <Header onSearch={setSearchQuery} />

      <main className="pt-4 px-6 pb-8">
        {/* Asset Class Tabs */}
        <div className="mb-6">
          <AssetClassTabs activeClass={assetClass} onChange={setAssetClass} />
        </div>

        {/* Main Trading Interface */}
        <div className="flex gap-4">
          {/* Left: Asset List */}
          <div className="w-80 bg-[--surface] border border-[--border] rounded-lg">
            <div className="p-4 border-b border-[--border]">
              <h2 className="font-semibold text-[--text-main]">
                {assetClass === "stocks" && "Actions Populaires"}
                {assetClass === "crypto" && "Top Crypto"}
                {assetClass === "forex" && "Paires Majeures"}
                {assetClass === "indices" && "Indices Mondiaux"}
                {assetClass === "commodities" && "Matières Premières"}
              </h2>
            </div>
            <AssetList
              assets={assets}
              selectedSymbol={selectedAsset?.symbol}
              onSelect={handleAssetSelect}
            />
          </div>

          {/* Center: Chart */}
          <div className="flex-1">
            {selectedAsset ? (
              <TradingChart
                symbol={selectedAsset.symbol}
                name={selectedAsset.name}
                price={selectedAsset.price}
                change={selectedAsset.change}
                changePercent={selectedAsset.changePercent}
                candles={candles}
              />
            ) : (
              <div className="h-[500px] bg-[--surface] border border-[--border] rounded-lg flex items-center justify-center">
                <p className="text-[--text-muted]">Sélectionnez un actif pour voir le graphique</p>
              </div>
            )}
          </div>

          {/* Right: Trading Panel */}
          <TradingPanel asset={selectedAsset} />
        </div>
      </main>
    </div>
  );
}
