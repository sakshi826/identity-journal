import { useState } from "react";
import { Button } from "@/components/ui/button";
import JournalCard from "./JournalCard";

interface Entry {
  text: string;
  sticker: string | null;
}

interface ReflectionScreenProps {
  entries: Entry[];
  onComplete: () => void;
}

const ReflectionScreen = ({ entries, onComplete }: ReflectionScreenProps) => {
  const [meaningful, setMeaningful] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in">
      <div className="max-w-md w-full space-y-5">
        <h2 className="text-lg text-center text-foreground">Your Gratitude Reflections</h2>
        <p className="text-sm text-muted-foreground text-center journal-font text-justify">
          These reflections are reminders of the strengths and experiences that shape who you are.
        </p>

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <JournalCard key={i} index={i} text={entry.text} sticker={entry.sticker} flipped compact noSparkle />
          ))}
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm space-y-3">
          <p className="text-sm text-foreground journal-font text-justify">
            Which reflection feels most meaningful today?
          </p>
          <textarea
            value={meaningful}
            onChange={(e) => setMeaningful(e.target.value)}
            placeholder="Optional..."
            className="w-full min-h-[70px] p-3 rounded-xl bg-background/60 border border-border text-foreground journal-font text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring text-justify"
          />
        </div>

        <Button variant="pride" size="lg" className="w-full" onClick={onComplete}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ReflectionScreen;
