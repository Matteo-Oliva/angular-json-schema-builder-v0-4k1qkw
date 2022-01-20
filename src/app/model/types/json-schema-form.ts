import * as fromTypes from './json-type-form';

export enum JSONSchemaOption {
  DEFAULT = 'http://json-schema.org/schema#',
  DRAFT_07 = 'http://json-schema.org/draft-07/schema#',
  DRAFT_06 = 'http://json-schema.org/draft-06/schema#',
  DRAFT_04 = 'http://json-schema.org/draft-04/schema#'
}

export type JSONFormConfig<T> = {
  [P in keyof T]: [T[P]];
};

export enum JSONCombinatorType {
  TYPE = 'type',
  ANY_OF = 'anyOf',
  ALL_OF = 'allOf',
  ONE_OF = 'oneOf'
}

export interface JSONSchema {
  $schema: JSONSchemaOption | null;
  $id: string;
  title: string;
  description: string;
  _type: JSONCombinatorType;
  _: fromTypes.JSONType | fromTypes.JSONType[] | null;
  // not: fromTypes.JSONType[] | null;
}

export interface JSONCombinator {
  _type: JSONCombinatorType;
  _: fromTypes.JSONType | fromTypes.JSONType[] | null;
}
