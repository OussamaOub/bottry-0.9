"use client";
import Logo from "@/components/logo";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import Suggestions from "@/app/(main)/_components/suggestions";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import MessageItem from "../_components/message-item";
import { useUser } from "@clerk/clerk-react";
import { useChatParams } from "@/hooks/useChatParams";
import { toast } from "sonner";

type ParamsProps = {
  docId: Id<"documents">;
};

interface MessageProps {
  content: string;
  role: "user" | "assistant";
  isDisplayed?: boolean;
}

function Chats() {
  const [value, setValue] = useState("");
  const inputref = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [newMessage, setNewMessage] = useState<MessageProps>();
  const { user } = useUser();
  const ismobile = useMediaQuery("(max-width: 640px)");
  const params = useParams<ParamsProps>();
  const messages = useQuery(api.chat.getPromptsByDocumentId, {
    documentId: params.docId,
  });
  const send = useAction(api.openai.chat);
  const chatParams = useChatParams();
  const {
    model,
    max_tokens,
    frequency_penalty,
    presence_penalty,
    temperature,
    n,
  } = chatParams;

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, newMessage]);

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleSend = async () => {
    if (value.length === 0) {
      toast.error("Please enter a message");
      return;
    }
    setIsSending(true);
    setNewMessage({
      content: value,
      role: "user",
      isDisplayed: true,
    });
    send({
      documentId: params.docId,
      newMsg: value,
      params: {
        model,
        max_tokens,
        frequency_penalty,
        presence_penalty,
        temperature,
        n,
      },
    }).then(() => {
      setNewMessage({
        content: value,
        role: "user",
        isDisplayed: false,
      });
      handleChange({ target: { value: "" } } as any);
      setIsSending(false);
    });
    inputref.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mt-16 flex flex-col gap-6 pb-8">
        {messages?.map((message, index) => (
          <div
            className={cn(
              "w-full flex items-center justify-center",
              message.role !== "user" &&
                "bg-foreground/10 dark:bg-[#47485a] py-4"
            )}
            ref={messages.length - 1 === index ? lastMessageRef : undefined}
          >
            <MessageItem
              message={message as MessageProps}
              key={message._id}
              user={user}
            />
          </div>
        ))}
        {newMessage?.isDisplayed === true && (
          <div
            className={cn(
              "w-full flex items-center justify-center",
              newMessage.role !== "user" && "dark:bg-[#47485a] py-4"
            )}
            ref={lastMessageRef}
          >
            <MessageItem message={newMessage as MessageProps} user={user} />
          </div>
        )}
        {isSending && (
          <div
            className={cn(
              "w-full flex items-center justify-center bg-foreground/10 dark:bg-[#47485a] py-4 animate-pulse duration-1000"
            )}
            ref={lastMessageRef}
          >
            <MessageItem loading user={user} />
          </div>
        )}
      </div>

      {messages?.length === 0 && !isSending && (
        <div className=" md:mb-48 self-center flex flex-col mb-12 w-fit h-fit">
          <Logo size="lg" />
        </div>
      )}
      {messages?.length === 0 && !isSending && <Suggestions />}
      <div className="flex mb-4 justify-center justify-self-end pt-6">
        <Textarea
          ref={inputref}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
              inputref.current?.focus();
            }
          }}
          placeholder="Ask a question"
          value={value}
          disabled={isSending}
          onChange={handleChange}
          rows={2}
          maxRows={5}
          className={cn(
            "w-1/2 resize-none mx-2 bg-transparent border-muted-foreground/50 h-fit"
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
  );
}

export default Chats;
