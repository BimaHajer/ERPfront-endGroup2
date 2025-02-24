export class Category {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public active?: boolean,
      public createdAt?: string,
      public updatedAt?: string,
      public createdBy?: number,
      public updatedBy?: number,
    ) { }
}