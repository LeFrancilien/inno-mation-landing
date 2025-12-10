"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-dim]">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full py-3 bg-[--surface] border border-[--border] rounded-xl text-[--text-main] text-sm placeholder:text-[--text-dim] transition-all duration-150",
                        "focus:outline-none focus:border-[--primary] focus:ring-2 focus:ring-[--primary]/20",
                        icon ? "pl-10 pr-4" : "px-4",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

// SearchInput with built-in search icon
interface SearchInputProps extends Omit<InputProps, "icon"> { }

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ placeholder = "Search...", ...props }, ref) => {
        return (
            <Input
                ref={ref}
                icon={<Search size={18} />}
                placeholder={placeholder}
                {...props}
            />
        );
    }
);

SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
