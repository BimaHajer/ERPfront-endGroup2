export class Product {

    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public tva?: number,
      public priceHT?: number,
      public priceTTC?: number,
      public initialQuantity?: number,
      public remainingQuantity?: number,
      public categoryId?: { id: number, name: string },
      public modelId?: { id: number, name: string, brandId: { id: number, name: string } },
      public images?:any[],
      public active?: boolean,
      public createdAt?: string,
      public updatedAt?: string,
      public createdBy?: number,
      public updatedBy?: number,
    ) { }
}
