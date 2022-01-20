import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  JSONType,
  JSONTypeOption,
  JSONArrayType,
  BaseJSONType
} from '../../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../../app/model/types/json-schema-form';
import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeFormComponent),
      multi: true
    }
  ]
})
export class TypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;
  toggle = false;
  // enums
  JSONTypeOption = JSONTypeOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('TypeFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<BaseJSONType> = {
      _type: [JSONTypeOption.OBJECT],
      _: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);
    this.formGroup.controls._type.setValidators(Validators.required);

    this.formGroup.valueChanges.subscribe(
      (formValue: BaseJSONType) => {
        return this.onChanged(formValue._);
      }
    );
  }

  /*
   * ControlValueAccessor boilerplate
   */
  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    // setTimeout(() => {
    //   this.onChanged(this.formGroup.value);
    // }, 0);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
