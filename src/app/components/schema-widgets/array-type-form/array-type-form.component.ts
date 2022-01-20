import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  JSONTypeOption,
  JSONBooleanType,
  JSONArrayType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-array-type-form',
  templateUrl: './array-type-form.component.html',
  styleUrls: ['./array-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayTypeFormComponent),
      multi: true
    }
  ]
})
export class ArrayTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('ArrayTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONArrayType> = {
      type: [JSONTypeOption.ARRAY],
      items: [null],
      contains: [null],
      minItems: [null],
      maxItems: [null],
      uniqueitems: [null],
      additionalItems: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONArrayType) => this.onChanged(formValue)
    );
  }
  /*
   * ControlValueAccessor boilerplate
   */
  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    setTimeout(() => {
      this.onChanged(this.formGroup.value);
    }, 0);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
