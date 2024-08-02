import { Component, OnInit } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { LanguageService } from "@core/services/language-service.interface";
import { Languages } from "@core/enums/language.enum";

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: "./language-selector.component.html",
  styleUrl: "./language-selector.component.css",
})
export class LanguageSelectorComponent {
  dropdownOpen = false;
  selectedLanguage: string = Languages.English;

  constructor(protected languageService: LanguageService) {
    this.selectedLanguage =
      localStorage.getItem("selectedLanguage") || Languages.English;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(lang: { code: string; label: string }) {
    this.selectedLanguage = lang.code;
    this.languageService.switchLanguage(lang.code);
    this.dropdownOpen = false;
  }
}
