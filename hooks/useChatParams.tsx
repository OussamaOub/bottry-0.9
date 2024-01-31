import { Model } from "openai/resources/models.mjs";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ChatParamsProps = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
  frequency_penalty: number;
  max_tokens: number;
  n: number;
  presence_penalty: number;
  temperature: number;
  model: string;
  setFrequencyPenalty: (frequency_penalty: number) => void;
  setMaxTokens: (max_tokens: number) => void;
  setN: (n: number) => void;
  setPresencePenalty: (presence_penalty: number) => void;
  setTemperature: (temperature: number) => void;
  setModel: (model: string) => void;
};

export const useChatParams = create<ChatParamsProps>()(
  persist(
    (set) => ({
      isOpen: false,
      frequency_penalty: 0.0,
      max_tokens: 750,
      n: 1,
      presence_penalty: 0.0,
      temperature: 0.6,
      model: "gpt-3.5-turbo-16k",
      setFrequencyPenalty: (frequency_penalty: number) =>
        set({ frequency_penalty }),
      setMaxTokens: (max_tokens: number) => set({ max_tokens }),
      setN: (n: number) => set({ n }),
      setPresencePenalty: (presence_penalty: number) =>
        set({ presence_penalty }),
      setTemperature: (temperature: number) => set({ temperature }),
      setModel: (model: string) => set({ model }),
      setOpen: () => set({ isOpen: true }),
      setClose: () => set({ isOpen: false }),
    }),
    {
      name: "chat-params",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
