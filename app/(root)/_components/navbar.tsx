"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const scrolled = useScrollTop();
  const { isAuthenticated } = useConvexAuth();

  return (
    <div
      className={cn(
        "flex items-center justify-between pt-8 pb-2 h-full transition-all duration-300 z-50",
        scrolled &&
          "border-b border-gray-300 dark:border-gray-700 bg-[#fff] dark:bg-[#020817] "
      )}
    >
      <Link href="/">
        <div className="hidden md:block ml-16">
          <Image
            src="/icons/logo.png"
            alt="Bottry"
            width={40}
            height={40}
            priority
            className="dark:hidden"
          />
          <Image
            src="/icons/logo-dark.png"
            alt="Bottry"
            width={40}
            height={40}
            priority
            className="hidden dark:block"
          />
        </div>
      </Link>
      <div className="flex gap-x-12 mx-auto md:mr-16">
        {isAuthenticated ? (
          <Link href="/chats">
            <Button className="rounded-full" size="lg">
              Enter Bottry
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal" afterSignInUrl="/chats">
            <Button className="rounded-full" size="lg">
              Get Started
            </Button>
          </SignInButton>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
