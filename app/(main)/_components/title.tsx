"use client";
import SelectModel from "@/components/select-model";
// import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { Model, ModelsPage } from "openai/resources/models.mjs";
// import { getAIModels } from "@/lib/openai";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TitleProps {
  intitalData: Doc<"documents">;
}

function Title({ intitalData }: TitleProps) {
  const [models, setModels] = useState<Model[]>();
  const getAIModels = useAction(api.openai.getAIModels);
  useEffect(() => {
    const getModels = async () => {
      console.log("getting models");
      const res = await getAIModels();
      setModels(res);
    };
    getModels();
  }, []);
  return (
    <div className="flex items-center gap-x-1 ">
      {/* <Button variant={"ghost"} size={"sm"} className="font-normal h-auto p-1">
        <span className="truncate text-muted-foreground">
          {intitalData?.title}
          Change this to model selection
        </span>
      </Button> */}
      <SelectModel models={models} />
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="w-full h-12 rounded-md bg-primary/10 animate-pulse duration-500" />
  );
};

export default Title;
