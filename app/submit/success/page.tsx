import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { FileCheck } from 'lucide-react';

export default function SubmitSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-[#8BAE6D]/10 rounded-full flex items-center justify-center">
                <FileCheck className="h-10 w-10 text-[#8BAE6D]" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Thank You</h1>
            
            <p className="text-gray-600 mb-8">
              Your information was submitted to our team of immigration attorneys. 
              Expect an email from hello@almalaw.ai.
            </p>
            
            <Link href="/">
              <Button size="lg" className="mx-auto">
                Go Back to Homepage
              </Button>
            </Link>
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