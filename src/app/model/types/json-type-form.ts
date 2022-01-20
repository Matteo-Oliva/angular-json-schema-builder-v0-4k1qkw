/*
 * keys starting with _ → ignore
 * key _ → pluck
 */

export enum JSONTypeOption {
  STRING = 'string',
  INTEGER = 'integer',
  NUMBER = 'number',
  OBJECT = 'object',
  ARRAY = 'array',
  BOOLEAN = 'boolean',
  NULL = 'null',
  REF = '$ref'
}

export enum JSONFormatOption {
  DATETIME = 'date-time',
  TIME = 'time',
  DATE = 'date',
  EMAIL = 'email',
  IDN_EMAIL = 'idn-email',
  HOSTNAME = 'hostname',
  IDN_HOSTNAME = 'idn-hostname',
  IPV4 = 'ipv4',
  IPV6 = 'ipv6',
  URI = 'uri',
  URI_REFERENCE = 'uri-reference',
  IRI = 'iri',
  IRI_REFERENCE = 'iri-reference',
  URI_TEMPLATE = 'uri-template',
  JSON_POINTER = 'json-pointer',
  RELATIVE_JSON_POINTER = 'relative-json-pointer',
  REGEX = 'regex'
}

export interface BaseJSONType {
  _type: JSONTypeOption;
  _: JSONType;
}

export type JSONType =
  | JSONStringType
  | JSONIntegerType
  | JSONNumberType
  | JSONObjectType
  | JSONArrayType
  | JSONBooleanType
  | JSONNullType;

export interface JSONStringType {
  type: JSONTypeOption.STRING;
  minLength: string | null; // form to parse as number
  maxLength: string | null; // form to parse as number
  pattern: string | null;
  format: JSONFormatOption | null;
  enum: string[] | null;
}

export interface JSONIntegerType {
  type: JSONTypeOption.INTEGER;
  multipleOf: number | null;
  minimum: number | null;
  exclusiveMinimum: number | null;
  maximum: number | null;
  exclusiveMaximum: number | null;
  enum: number[] | null;
}

export interface JSONNumberType {
  type: JSONTypeOption.NUMBER;
  multipleOf: number | null;
  minimum: number | null;
  exclusiveMinimum: number | null;
  maximum: number | null;
  exclusiveMaximum: number | null;
  enum: number[] | null;
}

export interface JSONObjectType {
  type: JSONTypeOption.OBJECT;
  properties: { [key: string]: JSONType } | null;
  additionalProperties: boolean | null;
  required: string[] | null;
}

export interface JSONArrayType {
  type: JSONTypeOption.ARRAY;
  items: JSONType | JSONType[] | null;
  minItems: number | null;
  maxItems: number | null;
  contains: JSONType | null;
  uniqueitems: true | null;
  additionalItems: false | null;
}

export interface JSONBooleanType {
  type: JSONTypeOption.BOOLEAN;
}

export interface JSONNullType {
  type: JSONTypeOption.NULL;
}

export interface JSONPointerType {
  $ref: string;
}
