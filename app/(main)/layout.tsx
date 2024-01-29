import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-white dark:bg-[#020817]">{children}</div>
  );
}

export default Layout;
