import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";
import { Option } from "./type/option.interface";

@Component({
  selector: "ftx-autocomplete",
  templateUrl: "./ftx-autocomplete.component.html",
  styleUrl: "./ftx-autocomplete.component.css",
})
export class FtxAutocompleteComponent implements AfterViewInit {
  @ViewChild("inputSelect", { static: false }) inputSelect!: ElementRef;

  filteredOptions!: Observable<any[]>;
  @Input() options: Option[] = [];
  @Input() placeholder: string = "Enter text";
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventFocusOutEmitter: EventEmitter<any> = new EventEmitter<any>();
  formControl: FormControl = new FormControl("");
  private _filter(value: string): Option[] {
    const filterValue = value;
    return this.options.filter((option) =>
      option.value.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.inputSelect.nativeElement.focus();
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }
  displayFn(option: Option): string {
    return option.value;
  }
  select(event: any) {
    this.eventEmitter.emit(event);
  }
  onFocusOut() {
    setTimeout(() => {
      this.eventFocusOutEmitter.emit("FocusOut");
    }, 200);
  }
}
