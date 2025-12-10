"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    LineChart,
    Newspaper,
    Bitcoin,
    Settings,
    HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
    { label: "Stocks", href: "/stocks", icon: <LineChart size={20} /> },
    { label: "Crypto", href: "/crypto", icon: <Bitcoin size={20} /> },
    { label: "News", href: "/news", icon: <Newspaper size={20} /> },
];

const bottomNavItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
    { label: "Help", href: "/help", icon: <HelpCircle size={20} /> },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-[--border] bg-[--background] p-4 flex flex-col">
            {/* Main Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-[--primary]/10 text-[--primary]"
                                    : "text-[--text-muted] hover:text-[--text-main] hover:bg-[--surface]"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="h-px bg-[--border] my-4" />

            {/* Bottom Navigation */}
            <nav className="space-y-1">
                {bottomNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-[--primary]/10 text-[--primary]"
                                    : "text-[--text-muted] hover:text-[--text-main] hover:bg-[--surface]"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Badge */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[--primary]/20 to-[--primary]/5 border border-[--primary]/30">
                <p className="text-sm font-semibold text-[--text-main]">Upgrade to Pro</p>
                <p className="text-xs text-[--text-muted] mt-1">
                    Unlock real-time data & alerts
                </p>
                <button className="mt-3 w-full py-2 text-xs font-medium bg-[--primary] text-[--background] rounded-lg hover:bg-[--primary-hover] transition-colors">
                    Upgrade Now
                </button>
            </div>
        </aside>
    );
}
