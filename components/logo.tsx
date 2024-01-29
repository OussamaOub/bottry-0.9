import Image from "next/image";
import React from "react";

type LogoProps = {
  size?: "sm" | "md" | "lg";
};

function Logo({ size }: LogoProps) {
  return (
    <div className="hidden md:block">
      <Image
        src="/icons/logo.png"
        alt="Bottry"
        width={
          size === "sm" ? 30 : size === "md" ? 40 : size === "lg" ? 50 : 40
        }
        height={
          size === "sm" ? 30 : size === "md" ? 40 : size === "lg" ? 50 : 40
        }
        priority
        className="dark:hidden"
      />
      <Image
        src="/icons/logo-dark.png"
        alt="Bottry"
        width={
          size === "sm" ? 30 : size === "md" ? 40 : size === "lg" ? 50 : 40
        }
        height={
          size === "sm" ? 30 : size === "md" ? 40 : size === "lg" ? 50 : 40
        }
        priority
        className="hidden dark:block"
      />
    </div>
  );
}

export default Logo;
