import * as fromTypes from './json-type';
import { JSONTypeOption, JSONFormatOption } from './json-type-form';

export interface JSONCombinatorData {
  $schema?: string;
  $id?: string;
  title?: string;
  description?: string;
  type?: JSONTypeOption;
  anyOf?: fromTypes.JSONTypeData[];
  allOf?: fromTypes.JSONTypeData[];
  oneOf?: fromTypes.JSONTypeData[];
  properties?: { [key: string]: JSONCombinatorData };
  enum?: string[] | number[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: JSONFormatOption;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  additionalProperties?: boolean;
  required?: string[];
  items?: fromTypes.JSONTypeData | fromTypes.JSONTypeData[];
  minItems?: number;
  maxItems?: number;
  contains?: fromTypes.JSONTypeData;
  uniqueitems?: true;
  additionalItems?: false;
  $ref?: string;
}
