"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";
// import Banner from "./banner";
// import Menu from "./menu";
// import Publish from "./publish";
// import IconPicker from "@/components/icon-picker";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

type DocumentIdParams = {
  docId: Id<"documents">;
};

function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams<DocumentIdParams>();
  const document = useQuery(api.documents.getById, { id: params.docId });

  if (document === undefined)
    return (
      <nav className="bg-background px-3 py-2 w-full flex items-center justify-between dark:bg-[#343541]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          {/* <Menu.Skeleton /> */}
        </div>
      </nav>
    );

  if (document === null) return <p>Document not found</p>;

  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4 dark:bg-[#343541]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            className="h-6 w-6 text-muted-foreground"
            onClick={onResetWidth}
          />
        )}
        <div className={cn("flex items-center justify-between w-full")}>
          {" "}
          <Title intitalData={document} />
          <div className="flex items-center gap-x-2">
            {/* <Publish initialData={document} /> */}
            {/* <Menu docId={document._id} /> */}
          </div>
        </div>
      </nav>
      {/* {document.isArchived && <Banner docId={document._id} />} */}
    </>
  );
}

export default Navbar;
