"use client";

import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <a href="/" className={cn("flex items-center gap-2", className)}>
      <Leaf className={cn("h-8 w-8 text-[#8BAE6D]", iconClassName)} />
      <span className={cn("font-bold text-2xl", textClassName)}>Alma</span>
    </a>
  );
}