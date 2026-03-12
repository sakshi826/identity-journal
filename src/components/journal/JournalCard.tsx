import { useState } from "react";
import SparkleEffect from "./SparkleEffect";
import StickerPicker from "./StickerPicker";

const BG_CLASSES = [
  "card-pastel-red",
  "card-pastel-orange",
  "card-pastel-yellow",
  "card-pastel-green",
  "card-pastel-blue",
  "card-pastel-purple",
];

interface JournalCardProps {
  index: number;
  text: string;
  sticker: string | null;
  onStickerSelect?: (s: string) => void;
  flipped?: boolean;
  compact?: boolean;
  noSparkle?: boolean;
}

const JournalCard = ({ index, text, sticker, onStickerSelect, flipped = false, compact = false, noSparkle = false }: JournalCardProps) => {
  const [sparkle, setSparkle] = useState(false);
  const bg = BG_CLASSES[index % BG_CLASSES.length];

  const handleFlip = () => {
    if (flipped && !noSparkle) setSparkle(true);
  };

  useState(() => {
    if (flipped && !noSparkle) {
      setTimeout(() => setSparkle(true), 300);
    }
  });

  return (
    <div className="perspective-[800px] w-full">
      <div
        className={`relative journal-card ${bg} ${flipped ? "flipped" : ""} ${compact ? "min-h-[120px]" : "min-h-[160px]"}`}
        onAnimationEnd={handleFlip}
      >
        {!noSparkle && <SparkleEffect active={sparkle} />}
        {!flipped ? (
          <div className="journal-card-front flex items-center justify-center h-full">
            <span className="text-2xl opacity-30">📝</span>
          </div>
        ) : (
          <div className="journal-card-back absolute inset-0 p-5 flex flex-col justify-between">
            <p className="journal-font text-foreground text-sm leading-relaxed text-justify">{text}</p>
            <div className="flex justify-between items-end mt-2">
              {sticker && <span className="text-2xl">{sticker}</span>}
              {onStickerSelect && <StickerPicker selected={sticker} onSelect={onStickerSelect} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalCard;
