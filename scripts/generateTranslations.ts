import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = 'AIzaSyC0ZrBzIxWgc0jV7VGcAEcBRANoJVsSTiw';
const BASE_LOCALE_PATH = path.join(__dirname, '../src/i18n/locales/en.json');
const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' },
  { code: 'pl', name: 'Polish' },
  { code: 'th', name: 'Thai' },
  { code: 'tl', name: 'Tagalog' }
];

async function translateText(text: string, targetLanguage: string) {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage,
        format: 'text',
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error: any) {
    console.error(`Error translating to ${targetLanguage}:`, error.response?.data || error.message);
    return text;
  }
}

async function generateTranslations() {
  const enData = JSON.parse(fs.readFileSync(BASE_LOCALE_PATH, 'utf-8'));
  const keys = Object.keys(enData);
  const values = Object.values(enData) as string[];

  for (const lang of LANGUAGES) {
    console.log(`Translating to ${lang.name} (${lang.code})...`);
    const translatedData: Record<string, string> = {};
    
    // Batch translation would be better but simple loop for now as per prompt constraints
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        
        // Skip translating variables like {{current}}
        if (value.includes('{{')) {
            translatedData[key] = value;
            continue;
        }

        translatedData[key] = await translateText(value, lang.code);
    }

    fs.writeFileSync(
      path.join(LOCALES_DIR, `${lang.code}.json`),
      JSON.stringify(translatedData, null, 2),
      'utf-8'
    );
    console.log(`Saved ${lang.code}.json`);
  }
}

// generateTranslations();
