import { useState, useEffect } from "react";
import { toast } from "sonner";
import IntroScreen from "@/components/journal/IntroScreen";
import PromptScreen from "@/components/journal/PromptScreen";
import ReflectionScreen from "@/components/journal/ReflectionScreen";
import CompletionScreen from "@/components/journal/CompletionScreen";
import HistoryScreen from "@/components/journal/HistoryScreen";

const PROMPTS = [
  {
    prompt: "What part of your identity are you grateful for today?",
    hints: [
      "I'm grateful for my courage to live authentically.",
      "I'm grateful for the community that supports me.",
      "I'm grateful for the resilience I've developed.",
    ],
  },
  {
    prompt: "What experience or journey helped shape who you are?",
    hints: [
      "My experiences helped me grow stronger.",
      "My journey helped me understand others better.",
    ],
  },
  {
    prompt: "What strength in yourself are you grateful for?",
    hints: [
      "My resilience.",
      "My empathy.",
      "My creativity.",
    ],
  },
];

interface Entry {
  text: string;
  sticker: string | null;
}

interface SavedJournal {
  entries: Entry[];
  date: string;
}

type Screen = "intro" | "prompt" | "reflection" | "completion" | "history";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [promptIndex, setPromptIndex] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<SavedJournal[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("journal-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleStart = () => setScreen("prompt");

  const handleSubmit = (text: string) => {
    setEntries((prev) => [...prev, { text, sticker: null }]);
    if (promptIndex < PROMPTS.length - 1) {
      setPromptIndex((p) => p + 1);
    } else {
      setScreen("reflection");
    }
  };

  const handleReflectionComplete = () => setScreen("completion");

  const handleSave = () => {
    const journal: SavedJournal = {
      entries,
      date: new Date().toISOString(),
    };
    const updated = [journal, ...history];
    setHistory(updated);
    localStorage.setItem("journal-history", JSON.stringify(updated));
    toast.success("Journal saved! 🌈");
  };

  const handleRestart = () => {
    setScreen("intro");
    setPromptIndex(0);
    setEntries([]);
  };

  const handleViewHistory = () => setScreen("history");
  const handleBackFromHistory = () => setScreen("intro");

  const handleBack = () => {
    if (screen === "prompt" && promptIndex > 0) {
      setPromptIndex((p) => p - 1);
      setEntries((prev) => prev.slice(0, -1));
    } else if (screen === "prompt" && promptIndex === 0) {
      setScreen("intro");
    } else if (screen === "reflection") {
      setScreen("prompt");
    } else if (screen === "completion") {
      setScreen("reflection");
    }
  };

  switch (screen) {
    case "intro":
      return <IntroScreen onStart={handleStart} onViewHistory={handleViewHistory} hasHistory={history.length > 0} onBack={() => window.history.back()} />;
    case "prompt":
      return (
        <PromptScreen
          key={promptIndex}
          prompt={PROMPTS[promptIndex].prompt}
          hints={PROMPTS[promptIndex].hints}
          current={promptIndex + 1}
          total={PROMPTS.length}
          isLast={promptIndex === PROMPTS.length - 1}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      );
    case "reflection":
      return <ReflectionScreen entries={entries} onComplete={handleReflectionComplete} onBack={handleBack} />;
    case "completion":
      return <CompletionScreen entries={entries} onSave={handleSave} onRestart={handleRestart} onViewHistory={handleViewHistory} />;
    case "history":
      return <HistoryScreen journals={history} onBack={handleBackFromHistory} />;
  }
};

export default Index;
