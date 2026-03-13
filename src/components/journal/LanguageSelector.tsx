import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "tr", name: "Türkçe" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
  { code: "it", name: "Italiano" },
  { code: "pl", name: "Polski" },
  { code: "th", name: "ไทย" },
  { code: "tl", name: "Tagalog" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    // Update URL without refreshing if needed, but i18next-browser-languagedetector 
    // usually handles detecting from query params on load.
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="fixed top-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-white/20 shadow-sm hover:bg-white/90 gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{currentLanguage.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-white/90 backdrop-blur-md border-white/20 shadow-xl">
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer ${i18n.language === lang.code ? "bg-accent text-accent-foreground" : ""}`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
