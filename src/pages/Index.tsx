import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import IntroScreen from "@/components/journal/IntroScreen";
import PromptScreen from "@/components/journal/PromptScreen";
import ReflectionScreen from "@/components/journal/ReflectionScreen";
import CompletionScreen from "@/components/journal/CompletionScreen";
import HistoryScreen from "@/components/journal/HistoryScreen";
import { useTranslation } from "react-i18next";

const PROMPTS = [
  {
    prompt: "prompt_1",
    hints: [
      "hint_1_1",
      "hint_1_2",
      "hint_1_3",
    ],
  },
  {
    prompt: "prompt_2",
    hints: [
      "hint_2_1",
      "hint_2_2",
    ],
  },
  {
    prompt: "prompt_3",
    hints: [
      "hint_3_1",
      "hint_3_2",
      "hint_3_3",
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
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [promptIndex, setPromptIndex] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<SavedJournal[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let userId = sessionStorage.getItem("user_id");
        if (!userId) {
          userId = "1001"; // Default guest user ID
          sessionStorage.setItem("user_id", userId);
        }
        const response = await axios.get("/api/journals", {
          headers: { "x-user-id": userId }
        });
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
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

  const handleSave = async () => {
    try {
      let userId = sessionStorage.getItem("user_id");
      if (!userId) {
        userId = "1001";
        sessionStorage.setItem("user_id", userId);
      }

      await axios.post("/api/journals", 
        { entries },
        { headers: { "x-user-id": userId } }
      );

      // Refresh history
      const response = await axios.get("/api/journals", {
        headers: { "x-user-id": userId }
      });
      setHistory(response.data);
      
      toast.success(t("common.rainbow"));
    } catch (err) {
      console.error("Error saving journal:", err);
      toast.error("Failed to save journal");
    }
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
