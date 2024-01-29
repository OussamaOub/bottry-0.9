"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }
  if (!isLoading && !isAuthenticated) {
    redirect("/");
  } else if (!isLoading && isAuthenticated) return <>{children}</>;
}

export default Layout;
