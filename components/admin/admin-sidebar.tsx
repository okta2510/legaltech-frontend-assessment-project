import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserSquare, Settings } from "lucide-react";

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true;
    }
    if (path !== "/admin" && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-[#F9FCF6] w-64 h-full",
        className
      )}
    >
      <div className="space-y-2 py-8 px-6">
        <Link href="/admin">
          <Button
            variant={isActive("/admin") ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive("/admin")
                ? "bg-[#8BAE6D] hover:bg-[#7A9C5D] text-white"
                : ""
            )}
          >
            <UserSquare className="mr-2 h-5 w-5" />
            Leads
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button
            variant={isActive("/admin/settings") ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive("/admin/settings")
                ? "bg-[#8BAE6D] hover:bg-[#7A9C5D] text-white"
                : ""
            )}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
      
      <div className="mt-auto p-6">
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium">Welcome to Almã Admin</h3>
          <p className="text-xs text-gray-600 mt-1">
            Manage your leads and applications from this dashboard.
          </p>
        </div>
      </div>
    </aside>
  );
}