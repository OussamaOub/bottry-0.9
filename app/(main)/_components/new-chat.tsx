import Logo from "@/components/logo";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function NewChat() {
  const create = useMutation(api.documents.createDocument);
  const router = useRouter();

  const handleCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  return (
    <div className="flex w-full items-center justify-center">
      <div
        onClick={handleCreate}
        role="button"
        className="flex items-center rounded-lg transition-all w-[90%] duration-300 py-[6px] bg-transparent hover:bg-primary/20 text-foreground mt-3"
      >
        <div className="justify-self-start mr-2 pl-4">
          <Logo size="sm" />
        </div>
        <div className="flex-1 text-sm font-semibold">New Chat</div>
        <div className="ml-auto pr-4">
          <EditIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default NewChat;
