import { Button } from "@/components/ui/button";

interface Entry {
  text: string;
  sticker: string | null;
}

interface SavedJournal {
  entries: Entry[];
  date: string;
}

const CARD_COLORS = [
  "card-pastel-red",
  "card-pastel-orange",
  "card-pastel-yellow",
  "card-pastel-green",
  "card-pastel-blue",
  "card-pastel-purple",
];

const HistoryScreen = ({ journals, onBack }: { journals: SavedJournal[]; onBack: () => void }) => {
  return (
    <div className="flex flex-col items-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-xl text-center text-foreground">Past Journals</h2>

        {journals.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center journal-font">No journals saved yet.</p>
        ) : (
          <div className="space-y-6">
            {journals.map((journal, ji) => (
              <div key={ji} className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm space-y-3">
                <p className="text-xs text-muted-foreground journal-font">
                  {new Date(journal.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-2 overflow-x-auto py-1">
                  {journal.entries.map((entry, i) => (
                    <div
                      key={i}
                      className={`${CARD_COLORS[i % CARD_COLORS.length]} rounded-xl p-3 w-28 min-w-[7rem] shadow-sm flex-shrink-0`}
                    >
                      <p className="journal-font text-[10px] text-foreground leading-tight line-clamp-4 text-justify">
                        {entry.text}
                      </p>
                      {entry.sticker && <span className="text-sm mt-1 block">{entry.sticker}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button variant="pride" size="lg" className="w-full" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default HistoryScreen;
