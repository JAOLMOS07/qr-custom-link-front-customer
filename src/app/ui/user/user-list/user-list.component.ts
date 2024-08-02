import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user/user.model";
import { UserService } from "@core/services/user-service.interface";
import { SearchService } from "../../shared/services/search.service";
import { MatDialog } from "@angular/material/dialog";
import { FtxDialogComponent } from "../../shared/components/ftx-dialog/ftx-dialog.component";
import { LanguageService } from "../../../core/services/language-service.interface";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.css",
})
export class UserListComponent implements OnInit {
  filter: string = "";
  dataSearch: string = "";
  totalItems = 50;
  itemsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];
  users: User[] = [];
  public isLoading = false;
  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private dialog: MatDialog,
    private languageService: LanguageService,
    private notificationService: NotificationService
  ) {
    this.searchService.getEventEmitter("users").subscribe((data) => {
      this.dataSearch = data;
      this.fetchUsers(this.currentPage, this.itemsPerPage, this.dataSearch);
    });
  }
  ngOnInit(): void {
    this.fetchUsers(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
  public fetchUsers(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): void {
    this.isLoading = true;
    this.userService.getAll(pageNumber, pageSize, filter).subscribe({
      next: (result) => {
        this.isLoading = false;

        this.users = result.data;
        this.totalItems = result.totalCount;
        this.itemsPerPage = result.pageSize;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  public showModalDelete(element: User): void {
    const dialogResult = this.dialog.open(FtxDialogComponent, {
      data: {
        content: this.languageService.translateKey("DELETE_USER_QUESTION"),
      },
    });

    dialogResult.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.userService.delete(element.id).subscribe(() => {
            this.notificationService.showSuccess(
              this.languageService.translateKey("USER_DELETED_SUCCESS")
            );
            this.fetchUsers(
              this.currentPage,
              this.itemsPerPage,
              this.dataSearch
            );
          });
        }
      },
      error: () => {
        this.notificationService.showSuccess(
          this.languageService.translateKey("USER_DELETED_ERROR")
        );
      },
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchUsers(this.currentPage, this.itemsPerPage, this.dataSearch);
  }

  getTypeUserSpanish(role: string): string {
    switch (role) {
      case "AdministratorCustomer":
        return this.languageService.translateKey("COMPANY_ADMINISTRATOR");
      case "AuxiliarCustomer":
        return this.languageService.translateKey("AUXILIAR");
      default:
        return "Desconocido";
    }
  }
}
