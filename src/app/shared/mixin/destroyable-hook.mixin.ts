import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constructor } from './helpers.mixin';

export function DestroySubjectHook<T extends Constructor<{}>>(
  Base: T
) {
  return class Mixin extends Base implements OnDestroy {
    protected destroyed$: Subject<void>;

    constructor(...args) {
      super();

      this.destroyed$ = new Subject<void>();

      const originalOnDestroy = this.ngOnDestroy;
      this.ngOnDestroy = () => {
        this.baseOnDestroy();
        originalOnDestroy.apply(this);
      };
    }

    ngOnDestroy(): void {}

    baseOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  };
}
