import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

interface PromptContextType {
  prompt: string;
  setPrompt: (p: string) => void;
  domain: string | null;
  setDomain: (d: string | null) => void;
  persona: string;
  setPersona: (p: string) => void;
  isOptimized: boolean;
  setIsOptimized: (b: boolean) => void;
  promptId: number | null;
  setPromptId: (id: number | null) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider = ({ children }: PropsWithChildren) => {
  const [prompt, setPrompt] = useState("");
  const [domain, setDomain] = useState<string | null>(null);
  const [persona, setPersona] = useState("");
  const [isOptimized, setIsOptimized] = useState(false);
  const [promptId, setPromptId] = useState<number | null>(null);

  return (
    <PromptContext.Provider
      value={{ prompt, setPrompt, domain, setDomain, persona, setPersona, isOptimized, setIsOptimized, promptId, setPromptId }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePrompt must be used within a PromptProvider");
  return context;
};