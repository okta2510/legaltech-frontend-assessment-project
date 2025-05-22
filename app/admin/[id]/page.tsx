"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { LeadStatusBadge } from "@/components/admin/lead-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lead } from "@/types";
import { getLeadById, updateLeadStatus, deleteLead } from "@/lib/db";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Globe,
  CalendarDays,
  FileType,
  AlertTriangle,
  Loader2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadLead();
  }, [id]);

  const loadLead = () => {
    setIsLoading(true);
    try {
      const leadData = getLeadById(id);
      if (leadData) {
        setLead(leadData);
      } else {
        // Lead not found, redirect to leads list
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error loading lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: "PENDING" | "REACHED_OUT") => {
    if (!lead) return;
    
    setIsUpdating(true);
    
    try {
      const updatedLead = updateLeadStatus(lead.id, newStatus);
      if (updatedLead) {
        setLead(updatedLead);
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!lead) return;
    
    setIsDeleting(true);
    
    try {
      const success = deleteLead(lead.id);
      if (success) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <p>Loading lead details...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
              <Link href="/admin">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Leads
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      
      <div className="flex flex-1">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">
                  {lead.firstName} {lead.lastName}
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                {lead.status === "PENDING" ? (
                  <Button
                    onClick={() => handleStatusChange("REACHED_OUT")}
                    disabled={isUpdating}
                    className="bg-[#8BAE6D] hover:bg-[#7A9C5D]"
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="mr-2 h-4 w-4" />
                    )}
                    Mark as Reached Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleStatusChange("PENDING")}
                    disabled={isUpdating}
                    variant="outline"
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Mark as Pending
                  </Button>
                )}
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this lead? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteLead}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {isDeleting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <Card className="md:col-span-8">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">Status</h3>
                        <LeadStatusBadge status={lead.status} className="text-sm" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">Submission Date</h3>
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          {format(new Date(lead.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">Email</h3>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                            {lead.email}
                          </a>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">LinkedIn</h3>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a 
                            href={lead.linkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            Profile <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Country of Citizenship</h3>
                      <p>{lead.country || "Not specified"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Visa Types of Interest</h3>
                      <div className="flex flex-wrap gap-2">
                        {lead.visaTypes.map((type) => (
                          <div 
                            key={type} 
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {lead.resumeUrl && (
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">Resume</h3>
                        <a
                          href={lead.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <FileType className="h-4 w-4 mr-2" />
                          View Resume <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                    
                    {lead.notes && (
                      <div>
                        <h3 className="text-sm text-muted-foreground mb-1">Notes</h3>
                        <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                          {lead.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="md:col-span-4 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      
                      <Button className="w-full justify-start" variant="outline">
                        <FileType className="h-4 w-4 mr-2" />
                        Add Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}