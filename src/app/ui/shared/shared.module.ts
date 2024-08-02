import { NgModule } from "@angular/core";
import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { OverlayModule } from "@angular/cdk/overlay";
import { ReactiveFormsModule } from "@angular/forms";
import { FtxInputComponent } from "./components/ftx-input/ftx-input.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule, NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";
import { FtxTableComponent } from "./components/ftx-table/ftx-table.component";
import { DataPropertyGetterPipe } from "./components/ftx-table/pipe/data-property-getter.pipe";
import { FtxSelectComponent } from "./components/ftx-select/ftx-select.component";
import { FtxButtonComponent } from "./components/ftx-button/ftx-button.component";
import { FtxLayoutPageComponent } from "./components/ftx-layout-page/ftx-layout-page.component";
import { FtxSpinnerComponent } from "./components/ftx-spinner/ftx-spinner.component";
import { FtxDialogComponent } from "./components/ftx-dialog/ftx-dialog.component";
import { FtxIconComponent } from "./components/ftx-icon/ftx-icon.component";
import { FtxCardComponent } from "./components/ftx-card/ftx-card.component";
import { FtxDividerComponent } from "./components/ftx-divider/ftx-divider.component";
import { FtxPaginatorComponent } from "./components/ftx-paginator/ftx-paginator.component";
import { FtxInputPasswordComponent } from "./components/ftx-input-password/ftx-input-password.component";
import { FtxItemComponent } from "./components/ftx-item/ftx-item.component";
import { FtxAutocompleteComponent } from "./ftx-autocomplete/ftx-autocomplete.component";
import { FtxToastComponent } from "./components/ftx-toaster/ftx-toast/ftx-toast.component";
import { FtxToasterComponent } from "./components/ftx-toaster/ftx-toaster/ftx-toaster.component";
import { FtxEmptyComponent } from "./components/ftx-empty/ftx-empty.component";
import { LanguageService } from "@core/services/language-service.interface";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { CoreModule } from "@core/core.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatPaginatorIntlCro } from "./components/ftx-paginator/CustomPaginatorConfiguration";
@NgModule({
  declarations: [
    FtxInputComponent,
    FtxTableComponent,
    DataPropertyGetterPipe,
    FtxSelectComponent,
    FtxButtonComponent,
    FtxSpinnerComponent,
    FtxLayoutPageComponent,
    FtxDialogComponent,
    FtxIconComponent,
    FtxCardComponent,
    FtxDividerComponent,
    FtxPaginatorComponent,
    FtxInputPasswordComponent,
    FtxItemComponent,
    FtxAutocompleteComponent,
    FtxToastComponent,
    FtxToasterComponent,
    FtxEmptyComponent,
  ],
  imports: [
    MatAutocompleteModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    NgTemplateOutlet,
    NgForOf,
    NgIf,
    CommonModule,
  ],
  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FtxInputComponent,
    FtxTableComponent,
    FtxSelectComponent,
    FtxButtonComponent,
    FtxLayoutPageComponent,
    FtxSpinnerComponent,
    FtxDialogComponent,
    FtxIconComponent,
    FtxCardComponent,
    FtxDividerComponent,
    FtxPaginatorComponent,
    FtxInputPasswordComponent,
    FtxItemComponent,
    FtxAutocompleteComponent,
    FtxToastComponent,
    FtxToasterComponent,
    FtxEmptyComponent,
  ],
  providers: [
    { provide: LanguageService, useClass: LanguageStore },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
  ],
})
export class SharedModule {}
