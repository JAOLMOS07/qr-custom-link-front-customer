import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

import { EventTypes } from "../../../services/models/event-types";
import { Toast } from "bootstrap";
import { fromEvent, take } from "rxjs";
@Component({
  selector: "ftx-toast",
  templateUrl: "./ftx-toast.component.html",
  styleUrl: "./ftx-toast.component.css",
})
export class FtxToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild("toastElement", { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: EventTypes;

  @Input()
  icon!: string;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === EventTypes.Error
        ? {
            delay: 3000,
          }
        : {
            delay: 3000,
          }
    );

    fromEvent(this.toastEl.nativeElement, "hidden.bs.toast")
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
