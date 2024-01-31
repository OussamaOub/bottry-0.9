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

type ParamsProps = {
  docId: Id<"documents">;
};

function Chats() {
  const [value, setValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("45px");
  const [isSending, setIsSending] = useState(false);
  const { user } = useUser();
  const ismobile = useMediaQuery("(max-width: 640px)");
  const params = useParams<ParamsProps>();
  const messages = useQuery(api.chat.getPromptsByDocumentId, {
    documentId: params.docId,
  });
  const create = useMutation(api.chat.createPrompt);
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

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    setValue("");
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
    }).then(() =>
      create({ content: value, documentId: params.docId, role: "user" }).then(
        () => setIsSending(false)
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto mt-16 flex flex-col gap-6"
      >
        {messages?.map((message) => (
          <MessageItem message={message} key={message._id} user={user} />
        ))}
      </div>
      {messages?.length === 0 && (
        <div className=" md:mb-48 self-center flex flex-col mb-12 w-fit h-fit">
          <Logo size="lg" />
        </div>
      )}
      {messages?.length === 0 && <Suggestions />}

      <div className="flex mb-4 justify-center justify-self-end ">
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
  );
}

export default Chats;
