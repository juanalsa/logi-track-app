import { CustomError, UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, email, password, role, is_active, contact_id } = object;

    if (!id) {
      throw CustomError.badRequest('Missing Id');
    }

    if (!email) throw CustomError.badRequest('Missing Email');

    if (!password) throw CustomError.badRequest('Missing Password');

    if (!role) throw CustomError.badRequest('Missing Role');

    if (!is_active) throw CustomError.badRequest('Missing Status');

    if (!contact_id) throw CustomError.badRequest('Missing Contact Id');

    return new UserEntity(id, email, password, role, is_active, contact_id);
  }
}
