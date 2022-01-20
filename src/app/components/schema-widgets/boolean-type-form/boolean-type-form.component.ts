import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  JSONTypeOption,
  JSONBooleanType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-boolean-type-form',
  templateUrl: './boolean-type-form.component.html',
  styleUrls: ['./boolean-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanTypeFormComponent),
      multi: true
    }
  ]
})
export class BooleanTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('BooleanTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONBooleanType> = {
      type: [JSONTypeOption.BOOLEAN]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONBooleanType) => this.onChanged(formValue)
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
