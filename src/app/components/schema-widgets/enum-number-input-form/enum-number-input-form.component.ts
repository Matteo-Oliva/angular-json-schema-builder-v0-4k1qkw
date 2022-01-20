import { Component, OnInit, forwardRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'app-enum-number-input-form',
  templateUrl: './enum-number-input-form.component.html',
  styleUrls: ['./enum-number-input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EnumNumberInputFormComponent),
      multi: true
    }
  ]
})
export class EnumNumberInputFormComponent
  implements OnInit, ControlValueAccessor {
  constructor() {}
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enums: number[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log(value);
    // Add our fruit
    if (value) {
      this.enums.push(parseFloat(value));
      this.onChanged(this.enums);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: number): void {
    const index = this.enums.indexOf(item);

    if (index >= 0) {
      this.enums.splice(index, 1);
      this.onChanged(this.enums);
    }
  }

  ngOnInit() {}
  /*
   * ControlValueAccessor boilerplate
   */
  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: number[]): void {
    if (obj) {
      this.enums = obj;
    }
    setTimeout(() => {
      this.onChanged(this.enums);
    }, 0);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
