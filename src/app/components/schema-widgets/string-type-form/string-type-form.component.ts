import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  JSONStringType,
  JSONTypeOption,
  JSONFormatOption
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-string-type-form',
  templateUrl: './string-type-form.component.html',
  styleUrls: ['./string-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringTypeFormComponent),
      multi: true
    }
  ]
})
export class StringTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  @Input() toggle: boolean;

  // enums
  JSONTypeOption = JSONTypeOption;
  JSONFormatOption = JSONFormatOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('StringTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONStringType> = {
      type: [JSONTypeOption.STRING],
      minLength: [null],
      maxLength: [null],
      pattern: [null],
      format: [null],
      enum: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONStringType) =>
        this.onChanged(this.getValue(formValue))
    );
  }

  getValue(formValue: JSONStringType) {
    return Object.keys(formValue).reduce((acc, cur) => {
      if (
        formValue[cur] === null ||
        formValue[cur] === '' ||
        formValue[cur] === undefined ||
        formValue[cur].length === 0
      ) {
        return acc;
      }
      if (cur === 'minLength' || cur === 'maxLength') {
        return {
          ...acc,
          [cur]: parseInt(formValue[cur], 10)
        };
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
