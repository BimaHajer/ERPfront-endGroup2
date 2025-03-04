export class Brand {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public picture?: string,
    public active?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public createdBy?: number,
    public updatedBy?: number,
    public deletedAt?: Date | null
  ) { }
}
