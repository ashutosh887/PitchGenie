"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// TODO: fix BreadCrumbs
const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="p-3 bg-background dark:bg-background-dark flex justify-between items-center border-b border-[#27272A]">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          {pathname === "/dashboard/settings" ? (
            // Show only "Settings" when on the Settings page
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-foreground dark:text-foreground-dark">
                Settings
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            // Default breadcrumb logic
            paths.map((path, index) => (
              <BreadcrumbItem key={index}>
                {index !== paths.length - 1 ? (
                  <BreadcrumbLink
                    href={`/${paths.slice(0, index + 1).join("/")}`}
                    className="capitalize text-foreground dark:text-foreground-dark"
                  >
                    {path.replace("-", " ")}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize text-foreground dark:text-foreground-dark">
                    {path.replace("-", " ")}
                  </BreadcrumbPage>
                )}
                {index !== paths.length - 1 && (
                  <span className="text-muted-foreground dark:text-muted-foreground-dark">
                    /
                  </span>
                )}
              </BreadcrumbItem>
            ))
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center space-x-1">
        <UserButton />
      </div>
    </div>
  );
};

export default Breadcrumbs;
