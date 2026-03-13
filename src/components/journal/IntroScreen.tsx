import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const IntroScreen = ({ onStart, onViewHistory, hasHistory, onBack }: { onStart: () => void; onViewHistory: () => void; hasHistory: boolean; onBack?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10 animate-fade-in relative">
      {onBack && (
        <button onClick={onBack} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-5xl mb-2">📔</div>
        <h1 className="text-2xl leading-tight text-foreground">
          Identity Gratitude Journal
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed text-justify journal-font">
          Gratitude helps us notice the strength and beauty in who we are.
          In this activity, you'll write a few reflections about parts of your identity you appreciate.
        </p>
        <Button variant="pride" size="lg" onClick={onStart} className="w-full mt-4">
          Start Journal
        </Button>
        {hasHistory && (
          <Button variant="ghost" size="lg" className="w-full text-muted-foreground" onClick={onViewHistory}>
            View Past Journals
          </Button>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;
