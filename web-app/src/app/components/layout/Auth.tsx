import { Link, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/app/components/AppSidebar'
// import { SidebarTrigger } from "@/app/components/ui/sidebar"

export function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout flex my-[5rem] mx-auto">
      <AppSidebar />
      {/* Main content area */}
      <main className="main-content">
        {/* <SidebarTrigger /> */}
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}

