export class Payment {
    constructor(
      public id?: number,
      public modePayment?: string,
      public description?: string,
      public active?: boolean,
      public createdAt?: string,
      public updatedAt?: string,
      public createdBy?: number,
      public updatedBy?: number,
    ) { }
}