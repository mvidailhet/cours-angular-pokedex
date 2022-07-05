import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, fromEvent, map, of, sampleTime, startWith, switchMap } from 'rxjs';

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
  private _currentScreenWidth: number | undefined;
  private _currentBreakpoint: SCREEN_SIZE_BREAKPOINTS | undefined | null;

  onResize$ = fromEvent(window, 'resize').pipe(
    sampleTime(300),
    map((event: Event) => {
      const windowElt = event.currentTarget as Window;
      return windowElt.innerWidth;
    }),
    startWith(window.innerWidth),
  );

  onScreenSizeBreakpointChange$ = this.onResize$.pipe(
    switchMap((newScreenWidth: number) => {
      const newBreakpoint = this.detectScreenSizeBreakpointChange(newScreenWidth);
      if (!newBreakpoint) return EMPTY;
      return of(newBreakpoint);
    }),
  );

  onResizeSubscription = this.onScreenSizeBreakpointChange$.subscribe(
    (newBreakpoint: SCREEN_SIZE_BREAKPOINTS | null) => {
      this._currentBreakpoint = newBreakpoint;
    },
  );

  private detectScreenSizeBreakpointChange(screenWidth: number): SCREEN_SIZE_BREAKPOINTS | null {
    if (screenWidth === this._currentScreenWidth) return null;
    this._currentScreenWidth = screenWidth;

    const newBreakpoint = this.getScreenSizeBreakpoint(screenWidth);
    if (newBreakpoint === this._currentBreakpoint) return null;

    this._currentBreakpoint = newBreakpoint;
    return this._currentBreakpoint;
  }

  private getScreenSizeBreakpoint(screensize: number): SCREEN_SIZE_BREAKPOINTS {
    if (screensize < SCREEN_SIZE_BREAKPOINTS.SM) {
      return SCREEN_SIZE_BREAKPOINTS.XS;
    }
    if (screensize < SCREEN_SIZE_BREAKPOINTS.MD) {
      return SCREEN_SIZE_BREAKPOINTS.SM;
    }
    if (screensize < SCREEN_SIZE_BREAKPOINTS.LG) {
      return SCREEN_SIZE_BREAKPOINTS.MD;
    }
    if (screensize < SCREEN_SIZE_BREAKPOINTS.XL) {
      return SCREEN_SIZE_BREAKPOINTS.LG;
    }
    if (screensize < SCREEN_SIZE_BREAKPOINTS.XXL) {
      return SCREEN_SIZE_BREAKPOINTS.XL;
    }
    return SCREEN_SIZE_BREAKPOINTS.XXL;
  }

  ngOnDestroy(): void {
    this.onResizeSubscription.unsubscribe();
  }
}
