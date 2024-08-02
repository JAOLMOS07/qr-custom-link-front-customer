import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private events: { [context: string]: EventEmitter<any> } = {};

  public emitEvent(context: string, filter?: any): void {
    if (!this.events[context]) {
      this.events[context] = new EventEmitter();
    }
    this.events[context].emit(filter);
  }

  public getEventEmitter(context: string): EventEmitter<any> {
    if (!this.events[context]) {
      this.events[context] = new EventEmitter();
    }
    return this.events[context];
  }
}
