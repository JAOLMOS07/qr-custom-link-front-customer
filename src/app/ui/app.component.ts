import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { PrincipalModule } from "./principal/principal.module";
import { LanguageService } from "@core/services/language-service.interface";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { CoreModule } from "@core/core.module";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    RouterLink,
    CoreModule,
    PrincipalModule,
    TranslateModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [
    SessionRepository,
    { provide: LanguageService, useClass: LanguageStore },
  ],
})
export class AppComponent {}
