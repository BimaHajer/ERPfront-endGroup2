export class provider {
    constructor(
      public id?: number,
      public firstName?: string,
      public lastName?: string,
      public email?: string,
      public phone?: string,
      public address?: string,
      public zipCode?: string,
      public active?: boolean,
      public createdAt?: string,
      public updatedAt?: string,
      public createdBy?: number,
      public updatedBy?: number,
    ) { }
  }