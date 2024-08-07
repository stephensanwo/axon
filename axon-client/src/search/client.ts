import {
  SearchParams,
  create,
  insert,
  search,
  insertMultiple,
  Results,
} from "@orama/orama";

export class SearchClient {
  id: string;
  client: any;

  constructor(id: string) {
    this.id = id;
  }

  public async initializeDBSchema(schema: object) {
    this.client = await create({
      schema: schema,
      id: this.id,
      components: {},
    });
  }

  public async insertIndex(data: object) {
    return await insert(this.client, data);
  }

  public async insertMultipleIndexes(data: object[]) {
    return await insertMultiple(this.client, data);
  }

  public async searchIndex<T>(
    params: SearchParams<any, any>
  ): Promise<Results<T>> {
    return search<any, T>(this.client, params);
  }
}
