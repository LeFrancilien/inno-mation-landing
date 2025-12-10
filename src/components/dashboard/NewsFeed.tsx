"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { NewsArticle } from "@/lib/api";
import { formatRelativeTime } from "@/lib/utils";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Image from "next/image";

interface NewsFeedProps {
    articles: NewsArticle[];
    title?: string;
}

function getSentimentIcon(sentiment: NewsArticle["sentiment"]) {
    switch (sentiment) {
        case "positive":
            return <TrendingUp className="w-4 h-4 text-[--success]" />;
        case "negative":
            return <TrendingDown className="w-4 h-4 text-[--danger]" />;
        default:
            return <Minus className="w-4 h-4 text-[--text-muted]" />;
    }
}

function getSentimentColor(sentiment: NewsArticle["sentiment"]) {
    switch (sentiment) {
        case "positive":
            return "border-l-[--success]";
        case "negative":
            return "border-l-[--danger]";
        default:
            return "border-l-[--text-muted]";
    }
}

export function NewsFeed({ articles, title = "Latest News" }: NewsFeedProps) {
    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold text-[--text-main]">{title}</h3>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-lg bg-[--background] border border-[--border] border-l-4 ${getSentimentColor(
                            article.sentiment
                        )} hover:bg-[--surface-hover] transition-colors group`}
                    >
                        <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[--surface]">
                                <Image
                                    src={article.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-sm font-medium text-[--text-main] line-clamp-2 group-hover:text-[--primary] transition-colors">
                                        {article.title}
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-[--text-dim] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-[--text-muted] mt-1 line-clamp-2">
                                    {article.summary}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-[--text-dim]">{article.source}</span>
                                    <span className="text-xs text-[--text-dim]">•</span>
                                    <span className="text-xs text-[--text-dim]">
                                        {formatRelativeTime(article.publishedAt)}
                                    </span>
                                    <span className="ml-auto">{getSentimentIcon(article.sentiment)}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </CardContent>
        </Card>
    );
}
