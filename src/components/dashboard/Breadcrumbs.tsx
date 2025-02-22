"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ChevronRight, Bell } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import navConfig from "@/config/navConfig";

const getTitleFromPath = (path: string): string | null => {
  for (const section of navConfig) {
    if (section.path === path) return section.title;
    if (section.subSections) {
      const found = section.subSections.find((sub) => sub.path === path);
      if (found) return found.title;
    }
  }
  return null;
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  return (
    <div className="p-4 bg-background dark:bg-background-dark flex justify-between items-center border-b border-[#27272A]">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          {paths.reduce<JSX.Element[]>((acc, segment, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
            const title =
              getTitleFromPath(fullPath) || segment.replace("-", " ");

            acc.push(
              <BreadcrumbItem key={index} className="flex items-center">
                {index !== paths.length - 1 ? (
                  <>
                    <BreadcrumbLink
                      href={fullPath}
                      className="hover:text-primary transition-colors"
                    >
                      {title}
                    </BreadcrumbLink>
                    <ChevronRight className="w-4 h-4 text-muted-foreground dark:text-muted-foreground-dark" />
                  </>
                ) : (
                  <BreadcrumbPage className="font-semibold">
                    {title === "settings" ? "Settings" : title}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            );
            return acc;
          }, [])}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-2">
        <Bell className="w-4 h-4 text-muted-foreground dark:text-muted-foreground-dark" />
        <UserButton />
      </div>
    </div>
  );
};

export default Breadcrumbs;
