"use client"
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/ui/theme-toggle';
import { usePathname } from 'next/navigation';

const DashboardHeader = () => {

  const routeTitles: Record<string, string> = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/pages": "Pages",
    "/sections": "Sections",
    "/seo": "SEO",
    "/media": "Media Library",
    "/users": "Users",
    "/settings": "Settings",
  };

  const pathname = usePathname()



  const currentTitle = routeTitles[pathname] || "Page";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle className='size-8' />
        <Badge variant="secondary" className="hidden  sm:flex">
          Admin
        </Badge>


      </div>
    </header>
  )
}

export default DashboardHeader