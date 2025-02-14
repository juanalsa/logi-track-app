import { Validators } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public name: string,
    public phone: string,
    public address: string,
    public email: string,
    public password: string,
    public cityId: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, phone, address, email, password, cityId } = object;

    if (!name) {
      return ['name is required'];
    }

    if (!phone) {
      return ['phone is required'];
    }

    if (!address) {
      return ['address is required'];
    }

    if (!email) {
      return ['email is required'];
    }

    if (!Validators.email.test(email)) return ['email is invalid'];

    if (!password) {
      return ['password is required'];
    }

    if (password.length < 6) return ['password too short'];

    if (!cityId) {
      return ['cityId is required'];
    }

    return [
      undefined,
      new RegisterUserDto(name, phone, address, email, password, cityId),
    ];
  }
}
