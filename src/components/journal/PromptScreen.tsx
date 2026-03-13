import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useTranslation } from "react-i18next";

interface PromptScreenProps {
  prompt: string;
  hints: string[];
  current: number;
  total: number;
  isLast: boolean;
  onSubmit: (text: string) => void;
  onBack: () => void;
}

const PromptScreen = ({ prompt, hints, current, total, isLast, onSubmit, onBack }: PromptScreenProps) => {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="max-w-md w-full space-y-5">
        <ProgressBar current={current} total={total} />

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-md space-y-4">
          <h2 className="text-lg text-foreground leading-snug text-justify">{t(prompt)}</h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("prompt.placeholder")}
            className="w-full min-h-[120px] p-4 rounded-xl bg-background/60 border border-border text-foreground journal-font text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring text-justify"
          />

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">{t("prompt.examples")}:</p>
            {hints.map((h, i) => (
              <p key={i} className="text-xs text-muted-foreground italic journal-font text-justify">"{t(h)}"</p>
            ))}
          </div>
        </div>

        <Button
          variant="pride"
          size="lg"
          className="w-full"
          disabled={!text.trim()}
          onClick={() => onSubmit(text.trim())}
        >
          {isLast ? t("completion.restart") : t("prompt.next")}
        </Button>
      </div>
    </div>
  );
};

export default PromptScreen;
