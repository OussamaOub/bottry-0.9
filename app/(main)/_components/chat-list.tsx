"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import ChatItem from "./chat-item";

function ChatList() {
  const documents = useQuery(api.documents.getDocuments);
  const create = useMutation(api.documents.createDocument);
  const router = useRouter();

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const promise = create().then((docId) => {
      router.push(`/chats/${docId}`);
    });
    toast.promise(promise, {
      loading: "Creating...",
      success: "Created!",
      error: "Failed to create.",
    });
  };

  if (documents === undefined) return <ChatItem.Skeleton />;

  if (documents.length === 0)
    return (
      <div className="flex items-center justify-center">
        <Button
          className="w-[80%] mt-5"
          onClick={handleCreate}
          variant={"outline"}
        >
          Create a chat to start
        </Button>
      </div>
    );

  return (
    <div>
      {documents?.map((doc) => (
        <ChatItem doc={doc} key={doc._id} />
      ))}
    </div>
  );
}

export default ChatList;
