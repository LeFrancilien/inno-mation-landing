"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        // Variants
                        "bg-[--primary] text-[--background] hover:bg-[--primary-hover]": variant === "primary",
                        "bg-[--surface] text-[--text-main] border border-[--border] hover:bg-[--surface-hover]": variant === "secondary",
                        "bg-transparent text-[--text-muted] hover:text-[--text-main] hover:bg-[--surface]": variant === "ghost",
                        "bg-[--danger] text-white hover:opacity-90": variant === "danger",
                        // Sizes
                        "text-xs px-3 py-1.5": size === "sm",
                        "text-sm px-4 py-2": size === "md",
                        "text-base px-6 py-3": size === "lg",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
