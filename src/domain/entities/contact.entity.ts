export class ContactEntity {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public address: string,
    public email: string,
    public cityId: string,
  ) {}
}
