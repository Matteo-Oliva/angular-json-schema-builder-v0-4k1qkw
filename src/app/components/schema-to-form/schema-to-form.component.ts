import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import {
  MixinRoot,
  DestroySubjectHook,
  CVAWrapper
} from '../../../app/shared/mixin';
import { takeUntil } from 'rxjs/operators';
import { JSONTypeOption } from '../../../app/model/types/json-type-form';
import { JSONCombinatorData } from '../../../app/model/types/json-schema';

/*

type
string -> input / select if enum
number -> input / select if enum
integer -> input / select if enum
boolean -> 3 way select
array -> input chip
object -> group

*/

@Component({
  selector: 'app-schema-to-form',
  templateUrl: './schema-to-form.component.html',
  styleUrls: ['./schema-to-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchemaToFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SchemaToFormComponent),
      multi: true
    }
  ]
})
export class SchemaToFormComponent
  extends DestroySubjectHook(CVAWrapper(MixinRoot))
  implements OnInit, OnChanges, ControlValueAccessor {
  JSONTypeOption = JSONTypeOption;

  type: JSONTypeOption;
  enum: boolean;

  // type object
  propertyKeys: string[];
  requiredKeys: string[];

  @Input() schema: JSONCombinatorData;
  @Input() label: string;
  @Input() required: boolean | null;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    if (this.schema === null || this.schema === undefined) {
      throw new TypeError(`The input "schema" is required`);
    }
    if (this.schema.type === undefined) {
      throw new TypeError(`The input "schema" has no type`);
    }
    this.type = this.schema.type;
    this.enum = !!this.schema.enum;

    switch (this.type) {
      case JSONTypeOption.OBJECT: {
        if (this.schema.properties === undefined) {
          throw new TypeError(
            `The input "schema" has no "properties" for type object`
          );
        }
        this.propertyKeys = Object.keys(this.schema.properties);
        this.requiredKeys = this.schema.required
          ? this.schema.required
          : [];
        break;
      }
    }

    this.buildForm();
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(formValue => {
        switch (this.type) {
          case JSONTypeOption.INTEGER: {
            this.onChanged(parseInt(formValue._, 10));
            break;
          }
          case JSONTypeOption.NUMBER: {
            this.onChanged(parseFloat(formValue._));
            break;
          }
          case JSONTypeOption.STRING: {
            this.onChanged(formValue._);
            break;
          }
          case JSONTypeOption.OBJECT: {
            this.onChanged(formValue);
            break;
          }
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  buildForm() {
    switch (this.type) {
      case JSONTypeOption.STRING: {
        this.formGroup = this.fb.group({
          _: [
            this.enum && this.schema.enum.length === 1
              ? this.schema.enum[0]
              : ''
          ]
        });

        const validators = [];
        if (this.schema.minLength) {
          validators.push(
            Validators.minLength(this.schema.minLength)
          );
        }
        if (this.schema.maxLength) {
          validators.push(
            Validators.maxLength(this.schema.maxLength)
          );
        }
        if (this.schema.pattern) {
          validators.push(Validators.pattern(this.schema.pattern));
        }
        if (this.required) {
          validators.push(Validators.required);
        }
        this.formGroup.controls._.setValidators(validators);
        break;
      }

      case JSONTypeOption.NUMBER: {
        this.formGroup = this.fb.group({
          _: [
            this.enum && this.schema.enum.length === 1
              ? this.schema.enum[0]
              : ''
          ]
        });

        const validators = [];
        if (this.schema.minimum) {
          validators.push(Validators.min(this.schema.minimum));
        }
        if (this.schema.maximum) {
          validators.push(Validators.max(this.schema.maximum));
        }
        if (this.schema.multipleOf) {
          // TODO
          // validators.push(Validators.pattern(this.schema.pattern));
        }
        if (this.required) {
          validators.push(Validators.required);
        }
        this.formGroup.controls._.setValidators(validators);
        break;
      }

      case JSONTypeOption.BOOLEAN: {
        this.formGroup = this.fb.group({
          _: [false]
        });
        break;
      }

      case JSONTypeOption.OBJECT: {
        const controlsConfig = this.propertyKeys.reduce(
          (acc, cur) => {
            return {
              ...acc,
              [cur]: [null]
            };
          },
          {}
        );

        this.formGroup = this.fb.group(controlsConfig);
        break;
      }
    }
  }

  public validate(): ValidationErrors | null {
    return this.formGroup.errors;
  }
}
