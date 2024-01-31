"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useChatParams } from "@/hooks/useChatParams";
import { cn } from "@/lib/utils";
import { RefreshCw, Settings2Icon } from "lucide-react";
import React from "react";

function SettingsSection() {
  const temperature = useChatParams((store) => store.temperature);
  const setTemperature = useChatParams((store) => store.setTemperature);
  const frequency_penalty = useChatParams((store) => store.frequency_penalty);
  const setFrequencyPenalty = useChatParams(
    (store) => store.setFrequencyPenalty
  );
  const presence_penalty = useChatParams((store) => store.presence_penalty);
  const setPresencePenalty = useChatParams((store) => store.setPresencePenalty);
  const max_tokens = useChatParams((store) => store.max_tokens);
  const setMaxTokens = useChatParams((store) => store.setMaxTokens);
  const n = useChatParams((store) => store.n);
  const setN = useChatParams((store) => store.setN);

  return (
    <Dialog>
      <div
        role="button"
        className="transition flex items-center justify-start gap-4 w-full hover:bg-neutral-300 dark:hover:bg-[#343541] m-0 rounded-md text-sm py-3 px-2"
      >
        <DialogTrigger
          className={cn("flex items-center justify-start gap-4 w-full")}
        >
          <Settings2Icon size={20} />
          <span className="text-sm text-foreground font-semibold">
            Settings
          </span>
        </DialogTrigger>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-foreground font-semibold">
              Temperature:
              <input
                type="number"
                min={0}
                max={2}
                step={0.01}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-16 ml-2"
              />
            </span>
            <div className="flex gap-1">
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <RefreshCw
                role="button"
                onClick={() => setTemperature(1)}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-foreground font-semibold">
              Frequency Penalty:
              <input
                type="number"
                min={-2}
                max={2}
                step={0.01}
                value={frequency_penalty}
                onChange={(e) =>
                  setFrequencyPenalty(parseFloat(e.target.value))
                }
                className="w-14 ml-2"
              />
            </span>
            <div className="flex gap-1">
              <input
                type="range"
                min={-2}
                max={2}
                step={0.01}
                value={frequency_penalty}
                onChange={(e) =>
                  setFrequencyPenalty(parseFloat(e.target.value))
                }
                className="w-full"
              />
              <RefreshCw
                role="button"
                onClick={() => setFrequencyPenalty(0)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground font-semibold">
                Presence Penalty:
                <input
                  type="number"
                  min={-2}
                  max={2}
                  step={0.01}
                  value={presence_penalty}
                  onChange={(e) =>
                    setPresencePenalty(parseFloat(e.target.value))
                  }
                  className="w-16 ml-2"
                />
              </span>
              <div className="flex gap-1">
                <input
                  type="range"
                  min={-2}
                  max={2}
                  step={0.01}
                  value={presence_penalty}
                  onChange={(e) =>
                    setPresencePenalty(parseFloat(e.target.value))
                  }
                  className="w-full"
                />
                <RefreshCw
                  role="button"
                  onClick={() => setPresencePenalty(0)}
                  className="h-4 w-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground font-semibold">
                Max Tokens:
                <input
                  type="number"
                  min={50}
                  max={14000}
                  step={1}
                  value={max_tokens}
                  onChange={(e) => setMaxTokens(parseFloat(e.target.value))}
                  className="w-16 ml-2"
                />
              </span>
              <div className="flex gap-1">
                <input
                  type="range"
                  min={50}
                  max={14000}
                  step={1}
                  value={max_tokens}
                  onChange={(e) => setMaxTokens(parseFloat(e.target.value))}
                  className="w-full"
                />
                <RefreshCw
                  role="button"
                  onClick={() => setMaxTokens(750)}
                  className="h-4 w-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground font-semibold">
                Number of responses:
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={1}
                  value={n}
                  onChange={(e) => setN(parseFloat(e.target.value))}
                  className="w-16 ml-2"
                />
              </span>
              <div className="flex gap-1">
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={n}
                  onChange={(e) => setN(parseFloat(e.target.value))}
                  className="w-full"
                />
                <RefreshCw
                  role="button"
                  onClick={() => setN(1)}
                  className="h-4 w-4"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsSection;
