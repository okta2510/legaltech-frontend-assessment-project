"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LeadsTable } from "@/components/admin/leads-table";
import { LeadFilters, FilterState } from "@/components/admin/lead-filters";
import { Lead, LeadStatus, VisaType } from "@/types";
import { getLeads } from "@/lib/db";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    setIsLoading(true);
    try {
      const allLeads = getLeads();
      setLeads(allLeads);
      setFilteredLeads(allLeads);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterState) => {
    const { search, status, country, visaType } = filters;
    
    let filtered = leads;
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (status !== "ALL") {
      filtered = filtered.filter((lead) => lead.status === status);
    }
    
    // Filter by country
    if (country) {
      filtered = filtered.filter((lead) => lead.country === country);
    }
    
    // Filter by visa type
    if (visaType !== "ALL") {
      filtered = filtered.filter((lead) => 
        lead.visaTypes.includes(visaType as VisaType)
      );
    }
    
    setFilteredLeads(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader userName="Admin" />
      
      <div className="flex flex-1">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Leads</h1>
              <p className="text-muted-foreground">
                Manage and track potential client inquiries
              </p>
            </div>

            <LeadFilters onFilterChange={handleFilterChange} />
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p>Loading leads...</p>
              </div>
            ) : (
              <LeadsTable 
                leads={filteredLeads} 
                onStatusChange={loadLeads} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}