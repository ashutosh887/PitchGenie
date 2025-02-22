"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import navConfig from "@/config/navConfig";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";
import appConfig from "@/config/appConfig";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-[#27272A]">
      <ScrollArea className="flex-grow p-4">
        {navConfig.map((section) => (
          <div key={section.title} className="mb-4">
            {section.showString ? (
              <Link
                href={section.path || "/dashboard"}
                className="text-foreground dark:text-foreground-dark font-semibold text-xl"
              >
                {appConfig.appName}
              </Link>
            ) : (
              <div className="text-gray-700 font-semibold text-lg mb-2">
                {section.icon &&
                  React.createElement(section.icon, {
                    className: "w-5 h-5 mr-2 inline",
                  })}
                {section.title}
              </div>
            )}

            {section.subSections && (
              <div className="ml-4 space-y-2 text-gray-500 text-sm">
                {section.subSections.map((sub) => (
                  <Link
                    key={sub.path}
                    href={sub.path}
                    className={cn(
                      "block px-3 py-1 rounded-md transition-colors",
                      pathname === sub.path
                        ? "bg-gray-200 text-gray-900"
                        : "hover:bg-gray-300 hover:text-gray-900"
                    )}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
      <Separator className="border-[#27272A]" />{" "}
      {/* Apply the new border color */}
      <div className="p-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center px-3 py-2 text-gray-500"
        >
          <Settings className="w-5 h-5 mr-2" /> {/* Settings icon */}
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
