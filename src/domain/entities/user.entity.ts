export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public status: boolean,
    public contactId: string,
  ) {}
}
