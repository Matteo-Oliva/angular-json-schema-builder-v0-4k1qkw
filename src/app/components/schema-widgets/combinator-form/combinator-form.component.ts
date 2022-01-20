import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  JSONCombinator,
  JSONFormConfig,
  JSONCombinatorType
} from '../../../../app/model/types/json-schema-form';
import { JSONTypeOption } from '../../../../app/model/types/json-type-form';

@Component({
  selector: 'app-combinator-form',
  templateUrl: './combinator-form.component.html',
  styleUrls: ['./combinator-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CombinatorFormComponent),
      multi: true
    }
  ]
})
export class CombinatorFormComponent implements OnInit {
  formGroup: FormGroup;

  @Input() name: string;

  // enums
  JSONTypeOption = JSONTypeOption;
  JSONCombinatorType = JSONCombinatorType;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('CombinatorFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONCombinator> = {
      _type: [null],
      _: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);

    this.formGroup.controls._type.setValidators(Validators.required);

    this.formGroup.valueChanges.subscribe(
      (formValue: JSONCombinator) => this.onChanged(formValue._)
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
