import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  JSONTypeOption,
  JSONNumberType,
  JSONNullType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-null-type-form',
  templateUrl: './null-type-form.component.html',
  styleUrls: ['./null-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NullTypeFormComponent),
      multi: true
    }
  ]
})
export class NullTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('NullTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONNullType> = {
      type: [JSONTypeOption.NULL]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe((formValue: JSONNullType) =>
      this.onChanged(formValue)
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
