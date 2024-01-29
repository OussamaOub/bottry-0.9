import { create } from "zustand";

type ChatParamsProps = {
  frequency_penalty?: number;
  max_tokens?: number;
  n?: number;
  presence_penalty?: number;
  temperature?: number;
  setFrequencyPenalty: (frequency_penalty: number) => void;
  setMaxTokens: (max_tokens: number) => void;
  setN: (n: number) => void;
  setPresencePenalty: (presence_penalty: number) => void;
  setTemperature: (temperature: number) => void;
};

export const useChatParams = create<ChatParamsProps>((set) => {
  return {
    frequency_penalty: 0,
    max_tokens: 750,
    n: 1,
    presence_penalty: 0.6,
    temperature: 0,
    setFrequencyPenalty: (frequency_penalty: number) =>
      set({ frequency_penalty }),
    setMaxTokens: (max_tokens: number) => set({ max_tokens }),
    setN: (n: number) => set({ n }),
    setPresencePenalty: (presence_penalty: number) => set({ presence_penalty }),
    setTemperature: (temperature: number) => set({ temperature }),
  };
});
