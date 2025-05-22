"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadStatus, VisaType } from "@/types";
import { Search, X } from "lucide-react";
import { COUNTRIES, VISA_OPTIONS } from "@/lib/constants";

interface LeadFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  status: LeadStatus | "ALL";
  country: string | null;
  visaType: VisaType | "ALL";
}

export function LeadFilters({ onFilterChange }: LeadFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "ALL",
    country: null,
    visaType: "ALL",
  });

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      status: "ALL",
      country: null,
      visaType: "ALL",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const anyFilterActive =
    filters.search !== "" ||
    filters.status !== "ALL" ||
    filters.country !== null ||
    filters.visaType !== "ALL";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            handleFilterChange("status", value as LeadStatus | "ALL")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.country || "ALL"}
          onValueChange={(value) =>
            handleFilterChange("country", value === "ALL" ? null : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            <SelectItem value="ALL">All Countries</SelectItem>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.visaType}
          onValueChange={(value) =>
            handleFilterChange("visaType", value as VisaType | "ALL")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Visa Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Visa Types</SelectItem>
            {VISA_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {anyFilterActive && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing filtered results
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}