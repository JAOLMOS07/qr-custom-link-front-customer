import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { LanguageService } from "@core/services/language-service.interface";
import { Subject } from "rxjs";

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel = "";
  override nextPageLabel = "";
  override previousPageLabel = "";
  override lastPageLabel = "";
  override firstPageLabel = "";

  constructor(private languageService: LanguageService) {
    super();
    this.initLabels();

    // Suscribirse a los cambios de idioma
    this.languageService.getLangChangeEvent().subscribe({
      next: () => {
        this.initLabels();
        this.changes.next(); // Notificar cambios en los labels
      },
    });
  }

  private initLabels() {
    this.itemsPerPageLabel =
      this.languageService.translateKey("ITEMS_PER_PAGE");
    this.nextPageLabel = this.languageService.translateKey("NEXT_PAGE");
    this.previousPageLabel = this.languageService.translateKey("PREVIOUS_PAGE");
    this.lastPageLabel = this.languageService.translateKey("LAST_PAGE");
    this.firstPageLabel = this.languageService.translateKey("FIRST_PAGE");
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.languageService.translateKey("OF")} ` + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.languageService.translateKey(
      "OF"
    )} ${length}`;
  };
}
