"use client";
import Image from "next/image";
import { UserResource } from "@clerk/types/dist/user";
import MarkDownToText from "./initialized-mdx-editor";
import { Skeleton } from "@/components/ui/skeleton";

// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";

interface MessageProps {
  content: string;
  role: "user" | "assistant";
}

function MessageItem({
  message,
  user,
  loading,
}: {
  message?: MessageProps;
  user: UserResource | null | undefined;
  loading?: boolean;
}) {
  return (
    <div className=" min-w-[500px] w-full max-w-[800px] flex flex-col gap-y-3 relative">
      <div className="flex items-center gap-x-3">
        {" "}
        <Image
          src={
            message?.role === "user"
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
            message?.role === "user"
              ? user?.imageUrl ?? "/icons/user-icon-dark.png"
              : "/icons/logo.png"
          }
          width={30}
          height={30}
          className="rounded-full hidden dark:block"
          alt="pfp"
        />
        <div>{message?.role === "user" ? user?.username : "Bottry"}</div>
      </div>
      {message && <MarkDownToText markdown={message.content} />}
      {loading && <Skeleton className="w-full h-20" />}
      {/* <Markdown rehypePlugins={[rehypeHighlight]}>{message.content}</Markdown> */}
      {/* <div className="ml-3">{message.content}</div> */}
    </div>
  );
}

MessageItem.Skeleton = function MessageItemSkeleton() {
  return <Skeleton className="w-full h-20" />;
};

export default MessageItem;
