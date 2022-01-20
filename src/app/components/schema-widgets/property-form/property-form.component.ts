import { Component, OnInit, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { JSONType } from '../../../app/model/types/json-type-form';
import { JSONFormConfig } from '../../../app/model/types/json-schema-form';
import { map } from 'rxjs/operators';

interface Property {
  key: string;
  value: JSONType;
}

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropertyFormComponent),
      multi: true
    }
  ]
})
export class PropertyFormComponent implements OnInit {
  formGroup: FormGroup;

  // enums

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('PropertyFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<Property> = {
      key: [null],
      value: [null]
    };
    const grp = this.fb.group(controlsConfig);

    grp.controls.key.setValidators([
      Validators.required,
      Validators.minLength(3)
    ]);

    this.formGroup = this.fb.group({
      _: this.fb.array([grp])
    });

    this.formGroup.valueChanges
      .pipe(map(v => v._))
      .subscribe((formValue: Property[]) => {
        this.onChanged(
          formValue.reduce((acc, cur) => {
            if (!cur.key || !cur.value) {
              return acc;
            }
            return {
              ...acc,
              [cur.key]: cur.value
            };
          }, {})
        );
      });
  }

  addItem() {
    (this.formGroup.controls._ as FormArray).push(this.createItem());
  }

  removeItem(i: number) {
    (this.formGroup.controls._ as FormArray).removeAt(i);
  }

  createItem() {
    const controlsConfig: JSONFormConfig<Property> = {
      key: [null],
      value: [null]
    };
    const grp = this.fb.group(controlsConfig);

    grp.controls.key.setValidators([
      Validators.required,
      Validators.minLength(3)
    ]);

    return grp;
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
