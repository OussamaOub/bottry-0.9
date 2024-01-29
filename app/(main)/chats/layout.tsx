"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }
  if (!isLoading && !isAuthenticated) {
    router.push("/");
  }
  return <>{children}</>;
}

export default Layout;
