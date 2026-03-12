import { Button } from "@/components/ui/button";

interface Entry {
  text: string;
  sticker: string | null;
}

const CARD_COLORS = [
  "card-pastel-red",
  "card-pastel-orange",
  "card-pastel-yellow",
  "card-pastel-green",
  "card-pastel-blue",
  "card-pastel-purple",
];

const CompletionScreen = ({
  entries,
  onSave,
  onRestart,
}: {
  entries: Entry[];
  onSave: () => void;
  onRestart: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center gap-3 overflow-x-auto py-4">
          {entries.map((entry, i) => (
            <div
              key={i}
              className={`${CARD_COLORS[i % CARD_COLORS.length]} rounded-xl p-3 w-28 min-w-[7rem] shadow-md rainbow-glow flex-shrink-0`}
            >
              <p className="journal-font text-[10px] text-foreground leading-tight line-clamp-4 text-justify">
                {entry.text}
              </p>
              {entry.sticker && <span className="text-lg mt-1 block">{entry.sticker}</span>}
            </div>
          ))}
        </div>

        <h2 className="text-xl text-foreground">
          Your gratitude reflects the many colors of who you are.
        </h2>
        <p className="text-3xl">🌈</p>

        <div className="space-y-3">
          <Button variant="pride" size="lg" className="w-full" onClick={onSave}>
            Save My Journal
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground"
            onClick={onRestart}
          >
            Write Again Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
