import { JSONTypeOption, JSONFormatOption } from './json-type-form';

/*
 * keys starting with _ → ignore
 * key _ → pluck
 */

export type JSONTypeData =
  | JSONStringTypeData
  | JSONIntegerTypeData
  | JSONNumberTypeData
  | JSONObjectTypeData
  | JSONArrayTypeData
  | JSONBooleanTypeData
  | JSONPointerTypeData;

export interface JSONStringTypeData {
  type: JSONTypeOption.STRING;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: JSONFormatOption;
  enum?: string[];
}

export interface JSONIntegerTypeData {
  type: JSONTypeOption.INTEGER;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  enum?: number[];
}

export interface JSONNumberTypeData {
  type: JSONTypeOption.NUMBER;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  enum?: number[];
}

export interface JSONObjectTypeData {
  type: JSONTypeOption.OBJECT;
  properties?: { [key: string]: JSONTypeData };
  additionalProperties?: boolean;
  required?: string[];
}

export interface JSONArrayTypeData {
  type: JSONTypeOption.ARRAY;
  items?: JSONTypeData[];
  minItems?: number;
  maxItems?: number;
  contains?: JSONTypeData[];
  uniqueitems?: true;
  additionalItems?: false;
}

export interface JSONBooleanTypeData {
  type: JSONTypeOption.BOOLEAN;
}

export interface JSONNullTypeData {
  type: JSONTypeOption.NULL;
}

export interface JSONPointerTypeData {
  $ref: string;
}
