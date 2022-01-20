import { JSONCombinatorData } from '../types/json-schema';

export class JSONSchemaClass {
  schema: JSONCombinatorData;

  constructor(schema: JSONCombinatorData) {
    this.schema = schema;
  }
}
