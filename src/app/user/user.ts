
export class User {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phone?: string,
    public password?: string,
    public picture?: string,
    public address?: string,
    public zipCode?: string,
    public token?: string | null,
    public active?: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public createdBy?: number,
    public updatedBy?: number,

  ) { }
}
