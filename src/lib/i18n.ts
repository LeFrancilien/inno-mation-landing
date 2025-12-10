export const FR_LABELS = {
    // Asset Classes
    stocks: "Actions",
    crypto: "Crypto",
    forex: "Devises",
    indices: "Indices",
    commodities: "Matières premières",

    // Navigation
    trading: "Trading",
    markets: "Marchés",
    portfolio: "Portefeuille",
    watchlist: "Watchlist",
    orders: "Ordres",
    history: "Historique",

    // Trading Panel
    buy: "Acheter",
    sell: "Vendre",
    market: "Marché",
    limit: "Limite",
    quantity: "Quantité",
    price: "Prix",
    total: "Total",

    // Stats
    change: "Variation",
    volume: "Volume",
    marketCap: "Cap. marché",
    high24h: "Haut 24h",
    low24h: "Bas 24h",

    // Time periods
    "1D": "1J",
    "1W": "1S",
    "1M": "1M",
    "3M": "3M",
    "1Y": "1A",
    "ALL": "Tout",

    // Common
    search: "Rechercher...",
    loading: "Chargement...",
    error: "Erreur",
    noData: "Aucune donnée",
};

export function formatPrice(price: number, currency = "USD"): string {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

export function formatNumber(value: number): string {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}Md`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
}

export function formatPercentage(value: number): string {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

export function formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
