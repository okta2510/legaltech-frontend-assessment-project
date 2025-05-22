import { Logo } from '@/components/logo';
import { LeadSubmissionForm } from '@/components/forms/lead-submission-form';
import { FileText } from 'lucide-react';

export default function Submit() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 lg:col-span-4 bg-[#F0F5E9] p-8 rounded-lg relative">
              <div className="sticky top-8">
                <div className="flex items-center mb-6">
                  <FileText className="h-8 w-8 text-[#8BAE6D] mr-3" />
                  <h2 className="text-2xl font-bold">Get An Assessment Of Your Immigration Case</h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Want to understand your visa options?
                </p>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-sm text-gray-600">
                    Submit the form and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
                    <div className="w-8 h-8 bg-[#F2C94C]/20 flex items-center justify-center rounded-full mr-3 flex-shrink-0">
                      <span className="text-[#F2C94C] text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm">Fill out your personal information</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
                    <div className="w-8 h-8 bg-[#8BAE6D]/20 flex items-center justify-center rounded-full mr-3 flex-shrink-0">
                      <span className="text-[#8BAE6D] text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm">Select visa categories of interest</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
                    <div className="w-8 h-8 bg-[#1C3144]/20 flex items-center justify-center rounded-full mr-3 flex-shrink-0">
                      <span className="text-[#1C3144] text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm">Submit and receive your assessment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7 lg:col-span-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold mb-2">Submit Your Information</h1>
                <p className="text-gray-600 mb-8">
                  Please fill out the form below to start your immigration assessment
                </p>
                
                <LeadSubmissionForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="mb-4 md:mb-0" />
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()}  <a href="http://oktaviardi.com">Oktaviardi.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}