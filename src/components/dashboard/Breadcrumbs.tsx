"use client";

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

const getTitleFromPath = (path: string) => {
  for (const section of navConfig) {
    if (section.path === path) return section.title;
    if (section.subSections) {
      for (const subSection of section.subSections) {
        if (subSection.path === path) return subSection.title;
      }
    }
  }
  return null;
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="p-4 bg-background dark:bg-background-dark flex justify-between items-center border-b border-[#27272A]">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          {paths.map((_, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
            const title =
              getTitleFromPath(fullPath) || paths[index].replace("-", " ");

            return (
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
                    {title}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-2">
        <Bell className="w-4 h-4 text-muted-foreground dark:text-muted-foreground-dark" />
        <ChevronRight className="w-1 h-1 text-muted-foreground dark:text-muted-foreground-dark" />
        <UserButton />
      </div>
    </div>
  );
};

export default Breadcrumbs;
