import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { PrincipalComponent } from "./principal.component";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { PrincipalRoutingModule } from "./principal-routing.module";
import { LanguageService } from "@core/services/language-service.interface";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { TranslateModule } from "@ngx-translate/core";
import { CoreModule } from "@core/core.module";
import { AuthService } from "@core/services/auth-service.interface";
import { AuthRepository } from "@infrastructure/repositories/auth.repository";
import { HttpService } from "@infrastructure/http/http.service";

@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    RouterLink,
    PrincipalRoutingModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
    SessionRepository,
    HttpService,
    { provide: LanguageService, useClass: LanguageStore },
    { provide: AuthService, useClass: AuthRepository },
  ],
  exports: [PrincipalComponent],
})
export class PrincipalModule {}
