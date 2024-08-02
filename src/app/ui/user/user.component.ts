import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MODULES } from "../routes.constants";
import { SearchService } from "../shared/services/search.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent implements OnInit {
  formControl!: FormGroup;
  filter!: string;
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}
  private CreateForm(): void {
    this.formControl = this.formBuilder.group({
      user: [""],
    });
  }
  ngOnInit(): void {
    this.CreateForm();
  }
  handleSearchEvent(filter: string) {
    this.searchService.emitEvent("users", filter);
  }
  protected readonly MODULES = MODULES;
}
