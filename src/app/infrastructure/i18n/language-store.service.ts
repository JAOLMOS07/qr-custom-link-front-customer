import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "@core/services/language-service.interface";
import { Languages } from "@core/enums/language.enum";
import { BehaviorSubject, forkJoin, map, Observable } from "rxjs";
import { Translations } from "@core/interfaces/translations.interface";

@Injectable({
  providedIn: "root",
})
export class LanguageStore extends LanguageService {
  availableLanguages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];
  private defaultLang: string = Languages.English;
  private translationsSubject = new BehaviorSubject<Translations>({});

  constructor(private translate: TranslateService) {
    super();
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
    this.translate.use(
      localStorage.getItem("selectedLanguage") || this.defaultLang
    );
  }

  loadTranslations(keys: string[]): Observable<Translations> {
    const translationObservables = keys.map((key) => this.translate.get(key));
    return forkJoin(translationObservables).pipe(
      map((translations) => {
        const translationMap: { [key: string]: string } = {};
        keys.forEach((key, index) => {
          translationMap[key] = translations[index];
        });
        this.translationsSubject.next(translationMap);
        return translationMap;
      })
    );
  }

  switchLanguage(languageCode: string) {
    if (
      this.availableLanguages.some((language) => language.code === languageCode)
    ) {
      this.translate.use(languageCode).subscribe(() => {
        const keys = Object.keys(this.translationsSubject.value);
        this.loadTranslations(keys).subscribe();
        localStorage.setItem("selectedLanguage", languageCode);
      });
    }
  }

  getAvailableLanguages() {
    return this.availableLanguages;
  }

  translateKey(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  getTranslations(): Observable<Translations> {
    return this.translationsSubject.asObservable();
  }
  getLangChangeEvent(): Observable<any> {
    return this.translate.onLangChange.asObservable();
  }
}
