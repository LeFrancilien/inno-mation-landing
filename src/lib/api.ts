// ============ CONFIGURATION ============
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "d4os8v9r01qnosaaehr0d4os8v9r01qnosaaehrg";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

// ============ TYPE DEFINITIONS ============

export type AssetClass = "stocks" | "crypto" | "forex" | "indices" | "commodities";

export interface Asset {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
    marketCap?: number;
    assetClass: AssetClass;
}

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
    sparkline: number[];
}

export interface ForexRate {
    pair: string;
    name: string;
    rate: number;
    change: number;
    changePercent: number;
    assetClass: "forex";
}

export interface IndexData {
    symbol: string;
    name: string;
    value: number;
    change: number;
    changePercent: number;
    assetClass: "indices";
}

export interface CommodityData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    unit: string;
    assetClass: "commodities";
}

export interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    source: string;
    url: string;
    imageUrl: string;
    publishedAt: Date;
    sentiment: "positive" | "neutral" | "negative";
}

// ============ FOREX API ============

const MAJOR_FOREX_PAIRS = [
    { pair: "EUR/USD", base: "EUR", quote: "USD", name: "Euro / Dollar américain" },
    { pair: "GBP/USD", base: "GBP", quote: "USD", name: "Livre sterling / Dollar américain" },
    { pair: "USD/JPY", base: "USD", quote: "JPY", name: "Dollar américain / Yen japonais" },
    { pair: "USD/CHF", base: "USD", quote: "CHF", name: "Dollar américain / Franc suisse" },
    { pair: "AUD/USD", base: "AUD", quote: "USD", name: "Dollar australien / Dollar américain" },
    { pair: "USD/CAD", base: "USD", quote: "CAD", name: "Dollar américain / Dollar canadien" },
];

export async function fetchForexRates(): Promise<ForexRate[]> {
    try {
        const rates = await Promise.all(
            MAJOR_FOREX_PAIRS.map(async ({ pair, base, quote, name }) => {
                const res = await fetch(
                    `${FINNHUB_BASE_URL}/quote?symbol=OANDA:${base}_${quote}&token=${FINNHUB_API_KEY}`
                );
                const data = await res.json();

                return {
                    pair,
                    name,
                    rate: data.c || 0,
                    change: data.d || 0,
                    changePercent: data.dp || 0,
                    assetClass: "forex" as const,
                };
            })
        );

        return rates.filter(r => r.rate > 0);
    } catch (error) {
        console.error("Forex API error:", error);
        return generateMockForexRates();
    }
}

// ============ INDICES API ============

const MAJOR_INDICES = [
    { symbol: "^GSPC", name: "S&P 500", finnhub: ".SPX" },
    { symbol: "^DJI", name: "Dow Jones", finnhub: ".DJI" },
    { symbol: "^IXIC", name: "NASDAQ", finnhub: ".IXIC" },
    { symbol: "^FCHI", name: "CAC 40", finnhub: "CAC40:IND" },
    { symbol: "^GDAXI", name: "DAX", finnhub: "DAX:IND" },
    { symbol: "^N225", name: "Nikkei 225", finnhub: "N225:IND" },
];

export async function fetchIndices(): Promise<IndexData[]> {
    try {
        const indices = await Promise.all(
            MAJOR_INDICES.map(async ({ symbol, name, finnhub }) => {
                const res = await fetch(
                    `${FINNHUB_BASE_URL}/quote?symbol=${finnhub}&token=${FINNHUB_API_KEY}`
                );
                const data = await res.json();

                return {
                    symbol,
                    name,
                    value: data.c || 0,
                    change: data.d || 0,
                    changePercent: data.dp || 0,
                    assetClass: "indices" as const,
                };
            })
        );

        return indices.filter(i => i.value > 0);
    } catch (error) {
        console.error("Indices API error:", error);
        return generateMockIndices();
    }
}

// ============ COMMODITIES API ============

const COMMODITIES = [
    { symbol: "GC=F", name: "Or", finnhub: "GC1:CMX", unit: "$/oz" },
    { symbol: "SI=F", name: "Argent", finnhub: "SI1:CMX", unit: "$/oz" },
    { symbol: "CL=F", name: "Pétrole WTI", finnhub: "CL1:NYM", unit: "$/baril" },
    { symbol: "BZ=F", name: "Pétrole Brent", finnhub: "BZ1:NYM", unit: "$/baril" },
    { symbol: "NG=F", name: "Gaz naturel", finnhub: "NG1:NYM", unit: "$/MMBtu" },
];

export async function fetchCommodities(): Promise<CommodityData[]> {
    try {
        const commodities = await Promise.all(
            COMMODITIES.map(async ({ symbol, name, finnhub, unit }) => {
                const res = await fetch(
                    `${FINNHUB_BASE_URL}/quote?symbol=${finnhub}&token=${FINNHUB_API_KEY}`
                );
                const data = await res.json();

                return {
                    symbol,
                    name,
                    price: data.c || 0,
                    change: data.d || 0,
                    changePercent: data.dp || 0,
                    unit,
                    assetClass: "commodities" as const,
                };
            })
        );

        return commodities.filter(c => c.price > 0);
    } catch (error) {
        console.error("Commodities API error:", error);
        return generateMockCommodities();
    }
}

// ============ CRYPTO API ============

export async function fetchCryptoData(): Promise<Asset[]> {
    try {
        const cryptoIds = ["bitcoin", "ethereum", "solana", "cardano", "ripple", "binancecoin"];
        const res = await fetch(
            `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${cryptoIds.join(",")}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        );
        const data = await res.json();

        return data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_24h || 0,
            changePercent: coin.price_change_percentage_24h || 0,
            high: coin.high_24h || 0,
            low: coin.low_24h || 0,
            volume: coin.total_volume,
            marketCap: coin.market_cap,
            assetClass: "crypto" as const,
        }));
    } catch (error) {
        console.error("CoinGecko API error:", error);
        return [];
    }
}

// ============ STOCKS API ============

export async function fetchStockQuote(symbol: string): Promise<Asset> {
    try {
        const [quoteRes, profileRes] = await Promise.all([
            fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
            fetch(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        ]);

        const quote = await quoteRes.json();
        const profile = await profileRes.json();

        if (quote.c === 0) throw new Error("Invalid symbol");

        return {
            symbol,
            name: profile.name || `${symbol} Corp.`,
            price: quote.c || 0,
            change: quote.d || 0,
            changePercent: quote.dp || 0,
            high: quote.h || 0,
            low: quote.l || 0,
            volume: profile.shareOutstanding || 0,
            marketCap: profile.marketCapitalization * 1000000 || 0,
            assetClass: "stocks",
        };
    } catch (error) {
        console.error("Stock API error:", error);
        throw error;
    }
}

// ============ CANDLE DATA (for charts) ============

export async function fetchCandles(
    symbol: string,
    resolution: "1" | "5" | "15" | "60" | "D" = "D",
    from?: number,
    to?: number
): Promise<Candle[]> {
    try {
        const toTimestamp = to || Math.floor(Date.now() / 1000);
        const fromTimestamp = from || toTimestamp - 30 * 24 * 60 * 60; // 30 days default

        const res = await fetch(
            `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${fromTimestamp}&to=${toTimestamp}&token=${FINNHUB_API_KEY}`
        );
        const data = await res.json();

        if (data.s !== "ok" || !data.t) {
            return [];
        }

        return data.t.map((time: number, i: number) => ({
            time,
            open: data.o[i],
            high: data.h[i],
            low: data.l[i],
            close: data.c[i],
            volume: data.v?.[i],
        }));
    } catch (error) {
        console.error("Candles API error:", error);
        return [];
    }
}

// ============ NEWS API ============

export async function fetchNews(symbol: string, count = 5): Promise<NewsArticle[]> {
    try {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);

        const res = await fetch(
            `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}&token=${FINNHUB_API_KEY}`
        );
        const news = await res.json();

        if (!Array.isArray(news) || news.length === 0) return [];

        return news.slice(0, count).map((item: any, index: number) => ({
            id: `${item.id || index}`,
            title: item.headline || "Sans titre",
            summary: item.summary || "Aucun résumé disponible.",
            source: item.source || "Inconnu",
            url: item.url || "#",
            imageUrl: item.image || `https://picsum.photos/seed/${index}/400/300`,
            publishedAt: new Date(item.datetime * 1000),
            sentiment: item.sentiment > 0.2 ? "positive" : item.sentiment < -0.2 ? "negative" : "neutral",
        }));
    } catch (error) {
        console.error("News API error:", error);
        return [];
    }
}

// ============ MOCK DATA GENERATORS ============

function generateMockForexRates(): ForexRate[] {
    return MAJOR_FOREX_PAIRS.map(({ pair, name }) => ({
        pair,
        name,
        rate: 1 + Math.random() * 0.5,
        change: (Math.random() - 0.5) * 0.01,
        changePercent: (Math.random() - 0.5) * 2,
        assetClass: "forex" as const,
    }));
}

function generateMockIndices(): IndexData[] {
    return MAJOR_INDICES.map(({ symbol, name }) => ({
        symbol,
        name,
        value: 10000 + Math.random() * 30000,
        change: (Math.random() - 0.5) * 500,
        changePercent: (Math.random() - 0.5) * 3,
        assetClass: "indices" as const,
    }));
}

function generateMockCommodities(): CommodityData[] {
    return COMMODITIES.map(({ symbol, name, unit }) => ({
        symbol,
        name,
        price: 50 + Math.random() * 100,
        change: (Math.random() - 0.5) * 5,
        changePercent: (Math.random() - 0.5) * 3,
        unit,
        assetClass: "commodities" as const,
    }));
}

export function generateMockChartData(days: number = 30): Array<{ timestamp: number; date: string; price: number; volume: number }> {
    const data = [];
    let price = 150 + Math.random() * 50;
    const now = Date.now();

    for (let i = days; i >= 0; i--) {
        const timestamp = now - i * 24 * 60 * 60 * 1000;
        price += (Math.random() - 0.48) * 5;
        price = Math.max(price, 50);

        data.push({
            timestamp,
            date: new Date(timestamp).toLocaleDateString("fr-FR", { month: "short", day: "numeric" }),
            price: parseFloat(price.toFixed(2)),
            volume: Math.floor(Math.random() * 50000000),
        });
    }

    return data;
}
