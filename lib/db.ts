import { Lead, LeadStatus, VisaType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// This is a mock database that uses localStorage in the browser
// In a real application, you would use a database like PostgreSQL, MongoDB, etc.

// Helper to safely access localStorage (only in browser)
const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

// Initial data to populate the database
const initialLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Jorge',
    lastName: 'Ruiz',
    email: 'jorge.ruiz@example.com',
    linkedIn: 'https://linkedin.com/in/jorgeruiz',
    country: 'Mexico',
    visaTypes: ['O-1'],
    notes: 'Interested in O-1 visa options for tech entrepreneurs',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '2',
    firstName: 'Bahar',
    lastName: 'Zamir',
    email: 'bahar.zamir@example.com',
    linkedIn: 'https://linkedin.com/in/baharzamir',
    country: 'Mexico',
    visaTypes: ['EB-1A'],
    notes: 'Award-winning researcher seeking visa options',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '3',
    firstName: 'Mary',
    lastName: 'Lopez',
    email: 'mary.lopez@example.com',
    linkedIn: 'https://linkedin.com/in/marylopez',
    country: 'Brazil',
    visaTypes: ['EB-2 NIW'],
    notes: 'Software engineer with 10+ years experience',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '4',
    firstName: 'Li',
    lastName: 'Zijin',
    email: 'li.zijin@example.com',
    linkedIn: 'https://linkedin.com/in/lizijin',
    country: 'South Korea',
    visaTypes: ['O-1', 'EB-1A'],
    notes: 'AI researcher looking for US visa options',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '5',
    firstName: 'Mark',
    lastName: 'Antonov',
    email: 'mark.antonov@example.com',
    linkedIn: 'https://linkedin.com/in/markantonov',
    country: 'Russia',
    visaTypes: ["I don't know"],
    notes: 'Looking for information about US visa options',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '6',
    firstName: 'Jane',
    lastName: 'Ma',
    email: 'jane.ma@example.com',
    linkedIn: 'https://linkedin.com/in/janema',
    country: 'Mexico',
    visaTypes: ['EB-2 NIW'],
    notes: 'Professor seeking NIW options',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '7',
    firstName: 'Anand',
    lastName: 'Jain',
    email: 'anand.jain@example.com',
    linkedIn: 'https://linkedin.com/in/anandjain',
    country: 'Mexico',
    visaTypes: ['O-1'],
    notes: 'CEO of tech startup',
    status: 'REACHED_OUT',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
  {
    id: '8',
    firstName: 'Anna',
    lastName: 'Voronova',
    email: 'anna.voronova@example.com',
    linkedIn: 'https://linkedin.com/in/annavoronova',
    country: 'France',
    visaTypes: ['EB-1A'],
    notes: 'Award-winning fashion designer',
    status: 'PENDING',
    createdAt: new Date('2024-02-02T14:45:00').toISOString(),
  },
];

// Initialize the database
export const initDatabase = () => {
  const localStorage = getLocalStorage();
  
  if (localStorage && !localStorage.getItem('leads')) {
    localStorage.setItem('leads', JSON.stringify(initialLeads));
  }
};

// Get all leads
export const getLeads = (): Lead[] => {
  const localStorage = getLocalStorage();
  
  if (!localStorage) {
    return initialLeads;
  }
  
  initDatabase();
  const leadsString = localStorage.getItem('leads');
  return leadsString ? JSON.parse(leadsString) : [];
};

// Get a lead by ID
export const getLeadById = (id: string): Lead | undefined => {
  const leads = getLeads();
  return leads.find(lead => lead.id === id);
};

// Create a new lead
export const createLead = (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>): Lead => {
  const localStorage = getLocalStorage();
  const newLead: Lead = {
    ...lead,
    id: uuidv4(),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  
  if (localStorage) {
    initDatabase();
    const leads = getLeads();
    leads.push(newLead);
    localStorage.setItem('leads', JSON.stringify(leads));
  }
  
  return newLead;
};

// Update a lead's status
export const updateLeadStatus = (id: string, status: LeadStatus): Lead | undefined => {
  const localStorage = getLocalStorage();
  
  if (!localStorage) {
    return undefined;
  }
  
  const leads = getLeads();
  const leadIndex = leads.findIndex(lead => lead.id === id);
  
  if (leadIndex === -1) {
    return undefined;
  }
  
  leads[leadIndex] = {
    ...leads[leadIndex],
    status,
  };
  
  localStorage.setItem('leads', JSON.stringify(leads));
  return leads[leadIndex];
};

// Update multiple leads' status
export const updateMultipleLeadStatus = (ids: string[], status: LeadStatus): Lead[] => {
  const localStorage = getLocalStorage();
  
  if (!localStorage) {
    return [];
  }
  
  const leads = getLeads();
  const updatedLeads = leads.map(lead => 
    ids.includes(lead.id) ? { ...lead, status } : lead
  );
  
  localStorage.setItem('leads', JSON.stringify(updatedLeads));
  return updatedLeads.filter(lead => ids.includes(lead.id));
};

// Delete a lead
export const deleteLead = (id: string): boolean => {
  const localStorage = getLocalStorage();
  
  if (!localStorage) {
    return false;
  }
  
  const leads = getLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  
  if (filteredLeads.length === leads.length) {
    return false;
  }
  
  localStorage.setItem('leads', JSON.stringify(filteredLeads));
  return true;
};