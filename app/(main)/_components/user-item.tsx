import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React from "react";
import LogoutSection from "./logout";
import ProfileSection from "./profile";
import SettingsSection from "./settings";

function UserItem() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <UserItem.Skeleton />;
  }
  return (
    <Popover>
      <PopoverTrigger className="border-t border-primary/10 mt-auto py-2 pb-3 rounded-t-lg w-full hover:bg-primary/20 transition-all duration-300 flex items-center justify-start pl-4 gap-x-4">
        <Image
          alt="pfp"
          src={user?.imageUrl ?? "/icons/user-icon.png"}
          width={30}
          height={30}
          className="rounded-full dark:hidden"
        />
        <Image
          alt="pfp"
          src={user?.imageUrl ?? "/icons/user-icon-dark.png"}
          width={30}
          height={30}
          className="rounded-full hidden dark:block"
        />
        <div>{user?.firstName}</div>
      </PopoverTrigger>
      <PopoverContent className="z-[99999] w-[calc(100vw-50px)] md:w-[200px] dark:bg-[#202123] p-0">
        <ProfileSection />
        <SettingsSection />
        <hr className="border-neutral-300 dark:border-neutral-700" />
        <LogoutSection />
      </PopoverContent>
    </Popover>
  );
}

UserItem.Skeleton = function UserItemSkeleton() {
  return <Skeleton className="border-2 border-red-500 mt-auto py-2 pb-3" />;
};

export default UserItem;
