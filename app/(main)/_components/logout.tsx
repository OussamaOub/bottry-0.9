import { SignOutButton } from "@clerk/clerk-react";
import { LogOutIcon } from "lucide-react";
import React from "react";

function LogoutSection() {
  return (
    <SignOutButton>
      <div
        role="button"
        className="transition flex items-center justify-start gap-4 w-full hover:bg-neutral-300 dark:hover:bg-[#343541] m-0 rounded-md text-sm py-3 px-2"
      >
        <LogOutIcon size={20} />
        <span className="text-sm text-foreground font-semibold">LogOut</span>
      </div>
    </SignOutButton>
  );
}

export default LogoutSection;
