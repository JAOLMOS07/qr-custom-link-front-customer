import { Component, Input } from "@angular/core";
import { Content } from "../content";
import { FtxDialogComponent } from "src/app/ui/shared/components/ftx-dialog/ftx-dialog.component";
import { ContenService } from "@core/services/content-service.interface";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MODULES } from "src/app/ui/routes.constants";
import { LanguageService } from "@core/services/language-service.interface";
import { SearchService } from "src/app/ui/shared/services/search.service";
import { NotificationService } from "src/app/ui/shared/services/notification.service";
import { PreviewComponent } from "src/app/ui/preview/preview.component";

@Component({
  selector: "app-content-item",
  templateUrl: "./content-item.component.html",
  styleUrl: "./content-item.component.css",
})
export class ContentItemComponent {
  @Input() content!: Content;
  public isLoading = false;
  constructor(
    private contentService: ContenService,
    private searchService: SearchService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    private languageService: LanguageService
  ) {}
  public showModalDelete(): void {
    const dialogResult = this.dialog.open(FtxDialogComponent, {
      data: {
        content: this.languageService.translateKey("DELETE_QUESTION_TAG"),
      },
    });

    dialogResult.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.isLoading = true;
          this.contentService.deleteContent(this.content.id).subscribe({
            next: () => {
              this.searchService.emitEvent("contents");
              this.notificationService.showSuccess(
                this.languageService.translateKey("DELETE_CONTENT_SUCCESS")
              );
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        }
      },
      error: () => {
        this.notificationService.showError(
          this.languageService.translateKey("DELETE_CONTENT_ERROR")
        );
      },
    });
  }

  public showEdit(content: any) {
    localStorage.setItem("contents", JSON.stringify(content));
    this.router.navigate([MODULES.CONTENTS.NEW_CONTENT]);
  }
  public showPreview(content: any) {
    localStorage.setItem("contents", JSON.stringify(content));
    this.dialog.open(PreviewComponent, {
      height: "100%",
      width: "60%",
    });
  }
  public assign(content: any) {
    localStorage.setItem("orders", JSON.stringify(content));
    this.router.navigate([MODULES.CONTENTS.ASSIGN_CONTENT]);
  }
}
