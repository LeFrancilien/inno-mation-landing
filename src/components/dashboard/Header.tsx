"use client";

import { SearchInput } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Bell, User, TrendingUp } from "lucide-react";

interface HeaderProps {
    onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[--border] bg-[--background]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[--primary]/10">
                        <TrendingUp className="w-6 h-6 text-[--primary]" />
                    </div>
                    <span className="text-xl font-bold">
                        <span className="text-[--primary]">All</span>
                        <span className="text-[--text-main]">Investor</span>
                    </span>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md mx-8">
                    <SearchInput
                        placeholder="Search stocks, crypto..."
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[--primary] rounded-full" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <User size={20} />
                    </Button>
                </div>
            </div>
        </header>
    );
}
