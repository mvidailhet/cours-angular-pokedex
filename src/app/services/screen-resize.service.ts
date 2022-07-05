import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, map, sampleTime, startWith } from 'rxjs';

export enum SCREEN_SIZE_BREAKPOINTS {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1400,
}

@Injectable({
  providedIn: 'root',
})
export class ScreenResizeService implements OnDestroy {
  onResize$ = fromEvent(window, 'resize').pipe(
    sampleTime(300),
    map((event: Event) => {
      const windowElt = event.currentTarget as Window;
      return windowElt.innerWidth;
    }),
    startWith(window.innerWidth),
  );

  onResizeSubscription = this.onResize$.subscribe((newWidth: number) => {
    console.log(newWidth);
  });

  ngOnDestroy(): void {
    this.onResizeSubscription.unsubscribe();
  }
}
