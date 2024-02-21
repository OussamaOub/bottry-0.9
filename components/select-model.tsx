import { Model, ModelsPage } from "openai/resources/models.mjs";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChatParams } from "@/hooks/useChatParams";
import { cn } from "@/lib/utils";
import { ReactAction } from "convex/react";
import { FunctionReference } from "convex/server";

function SelectModel({ models }: { models: string[] | undefined }) {
  const { model, setModel } = useChatParams();

  return (
    <Select onValueChange={(e) => setModel(e)} defaultValue={model}>
      <SelectTrigger>
        <SelectValue placeholder={model} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {models?.map((mod, index) => (
            <SelectItem
              value={mod}
              key={index}
              disabled={mod === model}
              className={cn(
                "truncate disabled:font-bold disabled:cursor-not-allowed text-foreground"
              )}
            >
              {mod}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectModel;
