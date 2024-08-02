import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MODULES } from "../../routes.constants";
import { LanguageService } from "@core/services/language-service.interface";
import { SearchService } from "../../shared/services/search.service";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrl: "./links.component.css",
})
export class LinksComponent implements OnInit {
  datosEntrada: any = [];
  formControl!: FormGroup;
  filter!: string;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private languageService: LanguageService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["mensaje"]) {
        this.datosEntrada = JSON.parse(params["mensaje"]);
      }
    });
    this.CreateForm();
  }
  private CreateForm(): void {
    this.formControl = this.formBuilder.group({
      user: [""],
    });
  }
  getTitleTranslate(orderId: string): string {
    return this.languageService.translateKey("ORDER_ASSIGN_LINKS", {
      orderId: orderId,
    });
  }
  handleSearchEvent(filter: string) {
    this.searchService.emitEvent("links", filter);
  }
  protected readonly MODULES = MODULES;
}
