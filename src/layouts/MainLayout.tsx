import type { ReactNode } from "react";
import { BaseLayout } from "./BaseLayout";
import { cn } from "@/lib/utils";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { PageLoader } from "@/components/PageLoader";

export const MainLayout = ({
  children,
  className,
  loading = false,
}: {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}) => {
  return (
    <BaseLayout>
      <DesktopSidebar />
      {loading ? (
        <PageLoader />
      ) : (
        <div
          className={cn(
            "lg:pl-20 w-full lg:h-[calc(100dvh-3.75rem)]",
            className,
          )}
        >
          {children}
        </div>
      )}
    </BaseLayout>
  );
};
