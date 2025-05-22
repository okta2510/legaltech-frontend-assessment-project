export type VisaType = 'O-1' | 'EB-1A' | 'EB-2 NIW' | "I don't know";

export type LeadStatus = 'PENDING' | 'REACHED_OUT';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  country?: string;
  visaTypes: VisaType[];
  resumeUrl?: string;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}