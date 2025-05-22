"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { LeadSubmissionForm } from '@/components/forms/lead-submission-form';
import { verifyToken } from '@/lib/auth';
import { useEffect, useState } from "react";
import { User } from '@/types';
import Cookies from 'js-cookie';

export default function Home() {


  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="space-x-2">
            <Link href="/admin">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="">
      <div className="w-full bg-[#DCE7A0] text-center space-y-6 mb-12  px-4 py-[100px] min-h-[350px] flex items-start justify-center">
        <div className='container mx-auto'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto">
            Get An Assessment Of Your Immigration Case
          </h1>
        </div>
      </div>
      <div className='flex-1 container mx-auto px-4 py-12'>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Want to understand your visa options?</h1>
            <p className="text-gray-600 mb-8">
              Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
            </p>
            
            <LeadSubmissionForm />
          </div>
        </div>
      </div>

      </main>
      
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="mb-4 md:mb-0" />
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} <a href="http://oktaviardi.com">Oktaviardi.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}