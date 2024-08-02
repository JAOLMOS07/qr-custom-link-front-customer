import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MODULES } from "../routes.constants";
import { SearchService } from "../shared/services/search.service";

@Component({
  selector: "app-contents",
  templateUrl: "./contents.component.html",
  styleUrl: "./contents.component.css",
})
export class ContentsComponent implements OnInit {
  formControl!: FormGroup;
  filter!: string;
  loading: boolean = false;
  protected readonly MODULES = MODULES;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}

  private CreateForm(): void {
    this.formControl = this.formBuilder.group({
      tag: [""],
    });
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  handleSearchEvent(filter: string) {
    this.searchService.emitEvent("contents", filter);
  }

  search(): void {
    this.filter = this.formControl.get("tag")?.value;
    this.searchService.emitEvent(this.filter);
  }
}
