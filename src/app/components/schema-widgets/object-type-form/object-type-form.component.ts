import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  JSONObjectType,
  JSONTypeOption
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-object-type-form',
  templateUrl: './object-type-form.component.html',
  styleUrls: ['./object-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjectTypeFormComponent),
      multi: true
    }
  ]
})
export class ObjectTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('ObjectTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONObjectType> = {
      type: [JSONTypeOption.OBJECT],
      properties: [null],
      additionalProperties: [null],
      required: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONObjectType) =>
        this.onChanged(this.getValue(formValue))
    );
  }

  getPropertyNames() {
    const propertyNames = this.formGroup.controls.properties.value;
    if (!propertyNames) {
      return [];
    }
    const frmGrp = Object.keys(propertyNames);
    return frmGrp;
  }

  getValue(formValue: JSONObjectType) {
    return Object.keys(formValue).reduce((acc, cur) => {
      if (
        formValue[cur] === null ||
        formValue[cur] === '' ||
        formValue[cur] === undefined ||
        formValue[cur].length === 0
      ) {
        return acc;
      }
      return {
        ...acc,
        [cur]: formValue[cur]
      };
    }, {});
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
}
