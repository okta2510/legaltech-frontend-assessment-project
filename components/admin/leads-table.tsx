"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadStatusBadge } from "@/components/admin/lead-status-badge";
import { Lead, LeadStatus } from "@/types";
import { format } from "date-fns";
import { 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Mail
} from "lucide-react";
import { updateMultipleLeadStatus } from "@/lib/db";

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange: () => void;
}

type SortField = "name" | "createdAt" | "status" | "country";
type SortDirection = "asc" | "desc";

export function LeadsTable({ leads, onStatusChange }: LeadsTableProps) {
  const router = useRouter();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const itemsPerPage = 10;

  // Sort leads
  const sortedLeads = [...leads].sort((a, b) => {
    if (sortField === "name") {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortDirection === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortField === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortField === "country") {
      const countryA = a.country || "";
      const countryB = b.country || "";
      return sortDirection === "asc"
        ? countryA.localeCompare(countryB)
        : countryB.localeCompare(countryA);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(paginatedLeads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (checked: boolean, leadId: string) => {
    if (checked) {
      setSelectedLeads((prev) => [...prev, leadId]);
    } else {
      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    }
  };

  const handleBulkStatusChange = async (newStatus: LeadStatus) => {
    if (selectedLeads.length === 0) return;
    
    setIsUpdating(true);
    
    try {
      updateMultipleLeadStatus(selectedLeads, newStatus);
      onStatusChange();
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error updating lead status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewLead = (leadId: string) => {
    router.push(`/admin/${leadId}`);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      {selectedLeads.length > 0 && (
        <div className="bg-muted p-4 rounded-md flex items-center justify-between">
          <div className="text-sm font-medium">
            {selectedLeads.length} lead{selectedLeads.length !== 1 && "s"} selected
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleBulkStatusChange("REACHED_OUT")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Mark as Reached Out
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedLeads([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    paginatedLeads.length > 0 &&
                    selectedLeads.length === paginatedLeads.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Submitted
                  <SortIcon field="createdAt" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  <SortIcon field="status" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("country")}
              >
                <div className="flex items-center">
                  Country
                  <SortIcon field="country" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) =>
                        handleSelectLead(!!checked, lead.id)
                      }
                      aria-label={`Select ${lead.firstName} ${lead.lastName}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(lead.createdAt), "MM/dd/yyyy, h:mm a")}
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell>{lead.country}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewLead(lead.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
}