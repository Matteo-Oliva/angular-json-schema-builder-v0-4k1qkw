import { Component, OnInit, forwardRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'app-string-enum-input-form',
  templateUrl: './enum-string-input-form.component.html',
  styleUrls: ['./enum-string-input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EnumStringInputFormComponent),
      multi: true
    }
  ]
})
export class EnumStringInputFormComponent
  implements OnInit, ControlValueAccessor {
  constructor() {}
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enums: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.enums.push(value.trim());
      this.onChanged(this.enums);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: string): void {
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

  writeValue(obj: string[]): void {
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
