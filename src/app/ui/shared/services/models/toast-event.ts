import { EventTypes } from "./event-types";

export interface ToastEvent {
  type: EventTypes;
  icon: string;
  message: string;
}
