import { Constructor } from './helpers.mixin';
import { FormGroup, ControlValueAccessor } from '@angular/forms';

export function CVAWrapper<T extends Constructor<{}>>(Base: T) {
  return class Mixin extends Base implements ControlValueAccessor {
    formGroup: FormGroup;

    protected getValue<F>(value: F) {}

    constructor(...args) {
      super();
    }

    /*
     * ControlValueAccessor boilerplate
     */
    onChanged: any = () => {};
    onTouched: any = () => {};

    writeValue(obj: any): void {
      setTimeout(() => {
        this.onChanged(this.getValue(this.formGroup.value));
      }, 0);
    }
    registerOnChange(fn: any): void {
      this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  };
}
