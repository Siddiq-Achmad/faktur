export const STATUS_COLORS: Record<string, string> = {
  paid: "oklch(0.64 0.22 163)",
  sent: "oklch(0.7019 0.15768 206.71)",
  draft: "oklch(0.3163 0.019 63.6992)",
  overdue: "oklch(0.7019 0.15768 52.88)",
  cancelled: "oklch(0.40 0.01 270)",
};

export const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};
