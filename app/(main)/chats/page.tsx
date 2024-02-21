"use client";
import Logo from "@/components/logo";
import React, { useEffect, useState } from "react";
import Suggestions from "../_components/suggestions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useChatParams } from "@/hooks/useChatParams";

function Chats() {
  const [value, setValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("45px");
  const [isSending, setIsSending] = useState(false);
  const ismobile = useMediaQuery("(max-width: 640px)");
  const create = useMutation(api.documents.createDocument);
  const createuserChat = useMutation(api.chat.createPrompt);
  const createOpenAIChat = useAction(api.openai.chat);
  const {
    frequency_penalty,
    max_tokens,
    model,
    n,
    presence_penalty,
    temperature,
  } = useChatParams();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        setValue((prev) => prev + "\n");
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);

    const numberOfLines = e.target.value.split("\n").length;
    const newHeight = `${Math.max(2, numberOfLines) * 20}px`;

    setTextareaHeight(newHeight);
  };

  const handleSend = () => {
    if (value.length === 0) return;
    setIsSending(true);

    create().then((docId) => {
      createOpenAIChat({
        documentId: docId,
        newMsg: value,
        params: {
          model,
          max_tokens,
          frequency_penalty,
          presence_penalty,
          temperature,
          n,
        },
      })
        .then(() => {
          handleChange({ target: { value: "" } } as any);
          setIsSending(false);
        })
        .then(() => router.push(`/chats/${docId}`));
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-auto self-center flex flex-col">
        <Logo size="lg" />
      </div>
      <div className="mt-auto">
        <Suggestions />
        <div className="flex items-center mb-4 justify-center">
          <Textarea
            placeholder="Ask a question"
            value={value}
            disabled={isSending}
            onChange={handleChange}
            style={{ height: textareaHeight }}
            className={cn(
              "w-1/2 resize-none mx-2 min-h-[45px] max-h-[250px] p-[10px] bg-transparent border-muted-foreground/50"
            )}
          />
          <Button
            variant="default"
            disabled={isSending}
            size={ismobile ? "sm" : "lg"}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
