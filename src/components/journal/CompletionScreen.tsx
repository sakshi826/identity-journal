import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Entry {
  text: string;
  sticker: string | null;
}

const CompletionScreen = ({
  entries,
  onSave,
  onRestart,
  onViewHistory,
}: {
  entries: Entry[];
  onSave: () => void;
  onRestart: () => void;
  onViewHistory: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in">
      <div className="max-w-md w-full space-y-6 text-center">
        <h2 className="text-xl text-foreground">
          {t("completion.subtitle")}
        </h2>
        <p className="text-3xl">🌈</p>

        <div className="space-y-3">
          <Button variant="pride" size="lg" className="w-full" onClick={onSave}>
            {t("completion.save")}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground"
            onClick={onViewHistory}
          >
            {t("intro.history")}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground"
            onClick={onRestart}
          >
            {t("completion.restart_later")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
