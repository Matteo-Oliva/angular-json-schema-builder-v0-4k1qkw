import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  JSONTypeOption,
  JSONIntegerType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-integer-type-form',
  templateUrl: './integer-type-form.component.html',
  styleUrls: ['./integer-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntegerTypeFormComponent),
      multi: true
    }
  ]
})
export class IntegerTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  @Input() toggle: boolean;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('IntegerTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONIntegerType> = {
      type: [JSONTypeOption.INTEGER],
      multipleOf: [null],
      minimum: [null],
      exclusiveMinimum: [null],
      maximum: [null],
      exclusiveMaximum: [null],
      enum: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONIntegerType) =>
        this.onChanged(this.getValue(formValue))
    );
  }

  getValue(formValue: JSONIntegerType) {
    return Object.keys(formValue).reduce((acc, cur) => {
      if (cur === 'type') {
        return {
          ...acc,
          [cur]: formValue[cur]
        };
      }
      if (
        cur === 'enum' &&
        formValue[cur] &&
        formValue[cur].length !== 0
      ) {
        return {
          ...acc,
          [cur]: formValue[cur]
        };
      }
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
        [cur]: parseInt(formValue[cur], 10)
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
