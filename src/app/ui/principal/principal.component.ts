import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MODULES } from "../routes.constants";
import { MatSidenav } from "@angular/material/sidenav";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { environment } from "@env/environment";
import { UserType } from "@core/enums/userType.enum";
import { LanguageService } from "@core/services/language-service.interface";
import { AuthService } from "@core/services/auth-service.interface";
import { MatDialog } from "@angular/material/dialog";
import { FtxDialogComponent } from "../shared/components/ftx-dialog/ftx-dialog.component";

interface menu {
  id: Number;
  name: string;
  router: string | string[];
  icon: string;
  alt: string;
}

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"], // Corrección de 'styleUrl' a 'styleUrls'
})
export class PrincipalComponent {
  protected readonly MODULES = MODULES;

  menuItems!: menu[];
  @ViewChild("sidenav")
  title: string = "test";
  menuOpened = true;

  showSidebar: boolean = true;

  menuWidth = 250;
  sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = true;
  isShowing = false;
  isLoading = false;
  showSubSubMenu: boolean = false;
  user: string = "";

  constructor(
    private router: Router,
    private languageService: LanguageService,
    protected sessionRepository: SessionRepository,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.menuItems = [
      {
        id: 1,
        name: this.languageService.translateKey("CONTENTS"),
        router: MODULES.CONTENTS.CONTENT,
        icon: "../../assets/icon_menu_empresa.svg",
        alt: this.languageService.translateKey("ICON_MENU_COMPANY_ALT"),
      },
      {
        id: 2,
        name: this.languageService.translateKey("ORDERS"),
        router: MODULES.ORDERS.ORDER_SERVICE,
        icon: "../../assets/icon_mi_empresa.svg",
        alt: this.languageService.translateKey("ICON_PARAMETERS_ALT"),
      },
    ];
  }

  public logout(): void {
    const dialogResult = this.dialog.open(FtxDialogComponent, {
      data: {
        content: this.languageService.translateKey("LOGOUT_QUESTION"),
      },
    });

    dialogResult.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.sessionRepository.deleteToken();
          window.location.href = `${environment.frontIdentityAppUrl}/auth/login`;
        }
      },
    });
  }
  changePassword(): void {
    this.isLoading = true;
    window.location.href = `${environment.frontIdentityAppUrl}/auth/update-password?showotp=true&sendotp=true`;
    this.authService.send_otp().subscribe({
      next: () => {},
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    const token = this.sessionRepository.getToken();
    this.user = token ? token.fullName?.toString() : "";
  }

  mouseleave() {
    this.isExpanded = false;
  }
}
