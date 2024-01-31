import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type ParamsProps = {
  docId: string;
};

function ChatItem({ doc }: { doc: Doc<"documents"> }) {
  const router = useRouter();
  const params = useParams<ParamsProps>();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc.title || "Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.updateDocument);

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    doc: Doc<"documents">
  ) => {
    if (e.key === "Enter") {
      disableInput();
    } else if (e.key === "Escape") {
      onChange(
        {
          target: { value: title },
        } as any as React.ChangeEvent<HTMLInputElement>,
        doc
      );
      disableInput();
    }
  };

  const handleArchive = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    e.preventDefault();
    e.stopPropagation();
    update({
      id,
      isArchived: true,
    });
    if (params.docId === doc._id) {
      router.push("/chats");
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    doc: Doc<"documents">
  ) => {
    setTitle(e.target.value);
    update({ id: doc._id, title: e.target.value || "Untitled" });
  };

  const handleNavigate = (id: Id<"documents">, e: React.MouseEvent) => {
    if (!isEditing) {
      e.preventDefault();
      router.push(`/chats/${id}`);
    }
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const enableInput = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    doc: Doc<"documents">
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTitle(doc.title);
    setIsEditing(true);
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
  };

  return (
    <div
      title={doc.title ?? "Untitled"}
      role="button"
      className={cn(
        "px-1 py-2 h-9 group/document transition flex items-center justify-between hover:bg-neutral-300 dark:hover:bg-neutral-700 mx-3 my-2 rounded-md cursor-pointer text-sm",
        params.docId === doc._id && "bg-neutral-300 dark:bg-neutral-700",
        doc.isArchived && "hidden"
      )}
      onClick={(e) => handleNavigate(doc._id, e)}
    >
      <div className="flex items-center mr-2 truncate">
        {isEditing ? (
          <input
            type="text"
            className="text-sm ml-2 w-full bg-transparent outline-none border-none focus:ring-transparent"
            value={title}
            ref={inputRef}
            autoFocus
            onBlur={disableInput}
            onChange={(e) => onChange(e, doc)}
            onKeyDown={(e) => onKeyDown(e, doc)}
          />
        ) : (
          <span className="text-sm ml-2" onClick={(e) => enableInput(e, doc)}>
            {doc.title}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <span
          onClick={(e) => handleArchive(e, doc._id)}
          className="text-sm ml-2 hidden group-hover/document:block hover:text-red-500 transition-all duration-300 bg-neutral-100/10 p-1 rounded-full"
          role="button"
        >
          <Trash2Icon className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

ChatItem.Skeleton = function ChatItemSkeleton() {
  return (
    <Skeleton className="h-9 w-[90%] my-2 mx-3 bg-secondary rounded-lg animate-pulse" />
  );
};

export default ChatItem;
