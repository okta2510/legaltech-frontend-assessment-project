import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, LockKeyhole, UserCog } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      
      <div className="flex flex-1">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and application preferences
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <UserCog className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Demo Account</h3>
                        <p className="text-xs text-blue-700 mt-1">
                          This is a demonstration account. Settings changes are not available in the demo version.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <LockKeyhole className="h-5 w-5 mr-2" />
                    Security
                  </CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Demo Account</h3>
                        <p className="text-xs text-blue-700 mt-1">
                          Security settings are not available in the demo version.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="border-t pt-6 mt-10">
              <h2 className="text-xl font-semibold mb-4">About This Demo</h2>
              <p className="text-gray-600 max-w-3xl mb-4">
                This is a demonstration of a lead management system for immigration services. 
                The application showcases a public lead submission portal and a protected admin dashboard 
                for managing leads.
              </p>
              <p className="text-gray-600 max-w-3xl">
                In a production environment, this application would integrate with email services, 
                secure file storage solutions, and a robust database. For this demo, these functionalities 
                are simulated with client-side implementations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}