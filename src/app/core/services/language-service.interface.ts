import { Observable } from "rxjs";
import { Translations } from "@core/interfaces/translations.interface";

export abstract class LanguageService {
  abstract loadTranslations(
    keys: string[]
  ): Observable<{ [key: string]: string }>;
  abstract switchLanguage(language: string): void;
  abstract getAvailableLanguages(): { code: string; label: string }[];
  abstract translateKey(key: string, params?: any): string;
  abstract getTranslations(): Observable<Translations>;
  abstract getLangChangeEvent(): Observable<any>;
}
