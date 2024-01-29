import SparklesCore from "@/components/particles";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";

function Main() {
  const { resolvedTheme } = useTheme();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <div className="w-full h-screen flex flex-col lg:flex-row justify-evenly z-50 relative">
        <div className="flex flex-col md:max-w-[400px] md:mt-[200px] px-16 lg:p-0">
          <h1 className="text-6xl font-medium text-center md:text-start">
            Bottry
          </h1>
          <span className="pt-8">
            <p className="text-center md:text-start">
              Bottry, a state-of-the-art chatbot, is your go-to for informative
              and friendly conversations. Whether you need info, advice, or just
              a chat, Bottry has you covered.
            </p>
          </span>
          <div>
            {isLoading && <Spinner size={"default"} />}

            {!isLoading && !isAuthenticated && (
              <SignInButton mode="modal" afterSignInUrl="/chats">
                <Button className="rounded-full w-fit" size="lg">
                  Get Started
                </Button>
              </SignInButton>
            )}

            {!isLoading && isAuthenticated && (
              <Link href="/chats">
                <Button className="rounded-full w-fit" size="lg">
                  Enter Bottry
                </Button>
              </Link>
            )}
          </div>{" "}
        </div>
        <Image
          src="/heroes/typing.png"
          alt="Bottry"
          width={800}
          height={800}
          priority
          draggable={false}
          className="mix-blend-multiply self-center"
        />
        <div className="flex items-center w-full p-6 bg-transparent z-50 dark:bg-[#020817] absolute bottom-0">
          <div className="hidden md:block">
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
          <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button variant={"ghost"} size={"sm"}>
              Privacy policy
            </Button>
            <Button variant={"ghost"} size={"sm"}>
              Terms and Conditions
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full -z-50"
          particleColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        />
      </div>
    </>
  );
}

export default Main;
