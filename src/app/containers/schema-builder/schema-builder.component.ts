import { Component, OnInit } from '@angular/core';
import { JSONTypeOption } from '../../../app/model/types/json-type-form';

@Component({
  selector: 'app-schema-builder',
  templateUrl: './schema-builder.component.html',
  styleUrls: ['./schema-builder.component.scss']
})
export class SchemaBuilderComponent implements OnInit {
  schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: '',
    title: '',
    description: '',
    type: 'object',
    properties: {
      Size: {
        type: 'object',
        properties: {
          Width: {
            type: 'object',
            properties: {
              Value: {
                type: 'number'
              },
              Unit: {
                type: 'string',
                enum: ['mm']
              }
            },
            required: ['Value', 'Unit']
          },
          Height: {
            type: 'object',
            properties: {
              Value: {
                type: 'number'
              },
              Unit: {
                type: 'string',
                enum: ['mm']
              }
            },
            required: ['Value', 'Unit']
          },
          Thickness: {
            type: 'object',
            properties: {
              Value: {
                type: 'number'
              },
              Unit: {
                type: 'string',
                enum: ['mm']
              }
            },
            required: ['Value', 'Unit']
          }
        },
        required: ['Width', 'Height', 'Thickness']
      }
    },
    required: ['Size']
  };
  constructor() {}

  ngOnInit() {}
}
