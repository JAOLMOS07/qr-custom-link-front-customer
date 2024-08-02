import { Injectable } from "@angular/core";
import { ToastEvent } from "./models/toast-event";
import { Observable, Subject } from "rxjs";
import { EventTypes } from "./models/event-types";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccess(message: string) {
    this._toastEvents.next({
      message,
      icon: "check_circle",
      type: EventTypes.Success,
    });
  }

  showInfo(message: string) {
    this._toastEvents.next({
      message,
      icon: "info",
      type: EventTypes.Info,
    });
  }
  showWarning(message: string) {
    this._toastEvents.next({
      message,
      icon: "warning",

      type: EventTypes.Warning,
    });
  }

  showError(message: string) {
    this._toastEvents.next({
      message,
      icon: "cancel",
      type: EventTypes.Error,
    });
  }
}
