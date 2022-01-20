import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  JSONSchema,
  JSONFormConfig,
  JSONCombinatorType,
  JSONSchemaOption
} from '../../../app/model/types/json-schema-form';

@Component({
  selector: 'app-schema-builder-form',
  templateUrl: './schema-builder-form.component.html',
  styleUrls: ['./schema-builder-form.component.scss']
})
export class SchemaBuilderFormComponent implements OnInit {
  formGroup: FormGroup;

  @Output() schema = new EventEmitter<any>();

  // enums
  JSONCombinatorType = JSONCombinatorType;
  JSONSchemaOption = JSONSchemaOption;

  CombinatorType: JSONCombinatorType;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // console.log('SchemaBuilderFormComponent ngOnInit');
    this.buildForm();
  }

  private buildForm() {
    const controlsConfig: JSONFormConfig<JSONSchema> = {
      $schema: [JSONSchemaOption.DRAFT_07],
      $id: [''],
      title: [''],
      description: [''],
      _type: [JSONCombinatorType.TYPE],
      _: [null]
    };

    this.formGroup = this.fb.group(controlsConfig);
  }

  getValue() {
    const formValue = this.formGroup.value as JSONSchema;

    // console.log(formValue._);
    return {
      $schema: formValue.$schema,
      $id: formValue.$id,
      title: formValue.title,
      description: formValue.description,
      ...formValue._
      // not: formValue.not
    };
  }

  emitSchema() {
    this.schema.emit(this.getValue());
  }
}
