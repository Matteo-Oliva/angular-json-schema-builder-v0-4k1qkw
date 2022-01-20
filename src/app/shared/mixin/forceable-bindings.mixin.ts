// https://stackoverflow.com/a/43954379/4711754 credit: Johannes Rudolph
import { OnChanges, EventEmitter } from '@angular/core';
import { Constructor } from './helpers.mixin';

export function ForceOutputs<T extends Constructor<{}>>(Base: T) {
  return class Mixin extends Base implements OnChanges {
    private outputsChecked = false;

    constructor(...args) {
      super();
      const originalOnChanges = this.ngOnChanges;
      this.ngOnChanges = () => {
        this.baseOnChanges();
        originalOnChanges.apply(this);
      };
    }

    ngOnChanges(): void {}

    baseOnChanges(): void {
      if (!this.outputsChecked) {
        // check parent is using outputs
        Object.keys(this)
          .filter(key => this[key] instanceof EventEmitter)
          .map(key => {
            if (this[key].observers.length === 0) {
              throw new TypeError(
                `The output ${key} is not used by the parent`
              );
            }
          });
        this.outputsChecked = true;
      }
    }
  };
}
