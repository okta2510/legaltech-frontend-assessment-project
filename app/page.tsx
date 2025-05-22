import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="space-x-2">
            <Link href="/admin">
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link href="/submit">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Get An Assessment Of Your Immigration Case
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Understand your visa options with expert guidance from our experienced immigration attorneys.
          </p>
          <div className="mt-8">
            <Link href="/submit">
              <Button size="lg" className="bg-[#8BAE6D] hover:bg-[#7A9C5D] text-white px-8 py-6 text-lg rounded-md">
                Start Your Assessment
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#F2C94C]/20 flex items-center justify-center rounded-full mb-4">
              <span className="text-[#F2C94C] text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Submit Your Information</h3>
            <p className="text-gray-600">Fill out our simple form with your details and immigration goals.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#8BAE6D]/20 flex items-center justify-center rounded-full mb-4">
              <span className="text-[#8BAE6D] text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Review</h3>
            <p className="text-gray-600">Our immigration attorneys will review your information.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#1C3144]/20 flex items-center justify-center rounded-full mb-4">
              <span className="text-[#1C3144] text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Assessment</h3>
            <p className="text-gray-600">Receive tailored visa recommendations and next steps.</p>
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