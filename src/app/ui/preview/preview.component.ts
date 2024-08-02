import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { SesionsComponent } from "./components/sesions/sesions.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ActivatedRoute } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";

@Component({
  selector: "app-preview",
  standalone: true,
  imports: [
    HeaderComponent,
    SharedModule,
    DetailProductComponent,
    SesionsComponent,
    FooterComponent,
  ],
  templateUrl: "./preview.component.html",
  styleUrl: "./preview.component.css",
})
export class PreviewComponent implements OnInit {
  defaultCountry: string = "COL";
  id: string | null = null;
  infoProduct: any;
  public contenido: any[] = [];
  public title: any;
  public isLoading: boolean = false;
  private deviceObserver: Observable<BreakpointState> =
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]);

  public dialogWidth: string = "50%";
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<PreviewComponent>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.setupBreakpointObserver();
    this.isLoading = true;
    let dataString = localStorage.getItem("contents");
    if (dataString !== null) {
      this.infoProduct = JSON.parse(dataString);
      localStorage.removeItem("contents");
      this.changeLanguage(0);
    }
    this.isLoading = false;
  }
  private setupBreakpointObserver(): void {
    this.sub = this.deviceObserver.subscribe((result) => {
      if (result.matches) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = "30%";
      }
      this.dialogRef.updateSize(this.dialogWidth);
    });
  }
  changeLanguage(language: number) {
    if (
      this.infoProduct &&
      this.infoProduct["contents"] &&
      this.infoProduct["contents"].length > language
    ) {
      this.title = this.infoProduct["contents"][language].title;
      this.contenido = this.infoProduct["contents"][language].details;
    } else {
      console.error("No hay datos disponibles para el idioma solicitado.");
    }
  }
}
