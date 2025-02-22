"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="p-4 bg-background dark:bg-background-dark flex justify-between items-center border-b border-gray-300">
      <div>
        {paths.map((path, index) => (
          <span
            key={index}
            className="mr-2 capitalize text-foreground dark:text-foreground-dark"
          >
            {path.replace("-", " ")}
          </span>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default Breadcrumbs;
