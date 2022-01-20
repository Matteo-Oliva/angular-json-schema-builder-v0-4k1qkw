import {
  Component,
  OnInit,
  forwardRef,
  Input,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  JSONTypeOption,
  JSONNumberType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-number-type-form',
  templateUrl: './number-type-form.component.html',
  styleUrls: ['./number-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberTypeFormComponent),
      multi: true
    }
  ]
})
export class NumberTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  @Input() toggle: boolean;

  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('NumberTypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONNumberType> = {
      type: [JSONTypeOption.NUMBER],
      multipleOf: [null],
      minimum: [null],
      exclusiveMinimum: [null],
      maximum: [null],
      exclusiveMaximum: [null],
      enum: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONNumberType) =>
        this.onChanged(this.getValue(formValue))
    );
  }

  getValue(formValue: JSONNumberType) {
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
