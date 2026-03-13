import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import JournalCard from "./JournalCard";
import { useTranslation } from "react-i18next";

interface Entry {
  text: string;
  sticker: string | null;
}

interface ReflectionScreenProps {
  entries: Entry[];
  onComplete: () => void;
  onBack: () => void;
}

const ReflectionScreen = ({ entries, onComplete, onBack }: ReflectionScreenProps) => {
  const [meaningful, setMeaningful] = useState("");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="max-w-md w-full space-y-5">
        <h2 className="text-lg text-center text-foreground">{t("reflection.title")}</h2>
        <p className="text-sm text-muted-foreground text-center journal-font text-justify">
          {t("reflection.subtitle")}
        </p>

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <JournalCard key={i} index={i} text={entry.text} sticker={entry.sticker} flipped compact noSparkle />
          ))}
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm space-y-3">
          <p className="text-sm text-foreground journal-font text-justify">
            {t("reflection.meaningful_question")}
          </p>
          <textarea
            value={meaningful}
            onChange={(e) => setMeaningful(e.target.value)}
            placeholder={t("common.optional")}
            className="w-full min-h-[70px] p-3 rounded-xl bg-background/60 border border-border text-foreground journal-font text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring text-justify"
          />
        </div>

        <Button variant="pride" size="lg" className="w-full" onClick={onComplete}>
          {t("common.continue")}
        </Button>
      </div>
    </div>
  );
};

export default ReflectionScreen;
