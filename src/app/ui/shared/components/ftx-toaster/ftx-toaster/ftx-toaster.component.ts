import { NotificationService } from "./../../../services/notification.service";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ToastEvent } from "../../../services/models/toast-event";

@Component({
  selector: "ftx-toaster",
  templateUrl: "./ftx-toaster.component.html",
  styleUrl: "./ftx-toaster.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtxToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.notificationService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        icon: toasts.icon,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
