import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpService } from "@infrastructure/http/http.service";
import { ContentsComponent } from "./contents.component";
import { ContentListComponent } from "./components/content-list/content-list.component";
import { ContentItemComponent } from "./components/content-item/content-item.component";
import { ContentRoutingModule } from "./content-routing.module";
import { ContenService } from "@core/services/content-service.interface";
import { ContentRepository } from "@infrastructure/repositories/content.repository";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { LanguageService } from "@core/services/language-service.interface";
import { CoreModule } from "@core/core.module";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [ContentsComponent, ContentListComponent, ContentItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ContentRoutingModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
    HttpService,
    { provide: ContenService, useClass: ContentRepository },
    { provide: LanguageService, useClass: LanguageStore },
  ],
  exports: [],
})
export class ContentsModule {}
