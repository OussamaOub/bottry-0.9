import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { UserResource } from "@clerk/types/dist/user";

function MessageItem({
  message,
  user,
}: {
  message: Doc<"prompt">;
  user: UserResource | null | undefined;
}) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center",
        message.role !== "user" && "bg-[#47485a] py-4"
      )}
    >
      <div className=" min-w-[500px] w-full max-w-[800px] flex flex-col gap-y-3">
        <div className="flex items-center gap-x-3">
          {" "}
          <Image
            src={
              message.role === "user"
                ? user?.imageUrl ?? "/icons/user-icon.png"
                : "/icons/logo.png"
            }
            width={20}
            height={20}
            className="rounded-full dark:hidden"
            alt="pfp"
          />
          <Image
            src={
              message.role === "user"
                ? user?.imageUrl ?? "/icons/user-icon-dark.png"
                : "/icons/logo.png"
            }
            width={30}
            height={30}
            className="rounded-full hidden dark:block"
            alt="pfp"
          />
          <div>{message.role === "user" ? user?.username : "Bottry"}</div>
        </div>
        <div className="ml-3">{message.content}</div>
      </div>
    </div>
  );
}

export default MessageItem;
