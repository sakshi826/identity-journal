import { Button } from "@/components/ui/button";

interface Entry {
  text: string;
  sticker: string | null;
}

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
