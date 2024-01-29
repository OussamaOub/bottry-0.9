import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function NewChat() {
  return (
    <div className="flex w-full items-center justify-center">
      <div
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
