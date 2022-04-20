import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {
    console.log('instantiating Logging service');
  }

  logItemCreated(itemName: string) {
    console.log(`Item created: ${itemName}`);
  }

  logItemRemoved(itemName: string) {
    console.log(`Item removed: ${itemName}`);
  }
}
