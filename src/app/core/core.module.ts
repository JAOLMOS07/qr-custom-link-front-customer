import {NgModule} from "@angular/core";
import {LanguageSelectorComponent} from "@core/components/language-selector/language-selector.component";
import {FormatStringPipe} from "@core/Pipes/format-string.pipe";


@NgModule({
  declarations: [
    FormatStringPipe
  ],
  imports: [
    LanguageSelectorComponent,
  ],
  exports: [
    LanguageSelectorComponent,
    FormatStringPipe
  ],
  providers: [
  ],
})
export class CoreModule {}
