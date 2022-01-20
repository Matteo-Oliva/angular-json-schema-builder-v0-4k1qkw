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
  FormBuilder,
  FormArray
} from '@angular/forms';
import { JSONFormConfig } from '../../../app/model/types/json-schema-form';
import { JSONType } from '../../../app/model/types/json-type-form';
import { map } from 'rxjs/operators';

interface JSONTypeForm {
  _: JSONType;
}

@Component({
  selector: 'app-many-type-form',
  templateUrl: './many-type-form.component.html',
  styleUrls: ['./many-type-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ManyTypeFormComponent),
      multi: true
    }
  ]
})
export class ManyTypeFormComponent
  implements OnInit, ControlValueAccessor {
  formGroup: FormGroup;

  @Input() name = 'unset';
  // enums

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('PropertyFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONTypeForm> = {
      _: [null]
    };
    const grp = this.fb.group(controlsConfig);

    this.formGroup = this.fb.group({
      [this.name]: this.fb.array([grp])
    });

    this.formGroup.valueChanges.subscribe(
      (formValue: { [key: string]: JSONTypeForm[] }) => {
        this.onChanged({
          [this.name]: formValue[this.name].map(val => val._)
        });
      }
    );
  }

  addItem() {
    (this.formGroup.get(this.name) as FormArray).push(
      this.createItem()
    );
  }

  removeItem(i: number) {
    (this.formGroup.get(this.name) as FormArray).removeAt(i);
  }

  createItem() {
    const controlsConfig: JSONFormConfig<JSONTypeForm> = {
      _: [null]
    };
    const grp = this.fb.group(controlsConfig);

    return grp;
  }

  getArray() {
    return this.formGroup.get(this.name) as FormArray;
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
