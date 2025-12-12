"use client";

import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants/status-colors";

interface InvoiceFiltersProps {
  limit: number;
  days: number | undefined;
  status: string | undefined;
  search: string | undefined;
  onLimitChange: (value: string) => void;
  onDaysChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"] as const;

export function InvoiceFilters({
  limit,
  days,
  status,
  search,
  onLimitChange,
  onDaysChange,
  onStatusChange,
  onSearchChange,
}: InvoiceFiltersProps) {
  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <InputGroup className="w-full sm:w-[280px]">
        <InputGroupInput
          placeholder="Search by client or company..."
          value={search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        {search && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={handleClearSearch}
              className="rounded-full"
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Clear search</span>
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show:</span>
        <Select value={limit.toString()} onValueChange={onLimitChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Period:</span>
        <Select value={days?.toString() || "all"} onValueChange={onDaysChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">Today</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="365">1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status:</span>
        <Select value={status || "all"} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map((statusValue) => (
              <SelectItem key={statusValue} value={statusValue}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: STATUS_COLORS[statusValue],
                    }}
                  />
                  <span>{STATUS_LABELS[statusValue]}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
