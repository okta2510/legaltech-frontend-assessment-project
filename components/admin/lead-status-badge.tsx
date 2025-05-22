import { LeadStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "REACHED_OUT":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusText = (status: LeadStatus) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "REACHED_OUT":
        return "Reached Out";
      default:
        return status;
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        getStatusColor(status),
        "border-0 font-medium",
        className
      )}
    >
      {getStatusText(status)}
    </Badge>
  );
}