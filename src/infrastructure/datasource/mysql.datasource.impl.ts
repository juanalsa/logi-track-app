import { IAuthDatasource } from '../../application';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';

export class MySQLDatasourceImpl implements IAuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, cityId } = registerUserDto;

    try {
      // Guardar info contacto
      // Guardar info usuario
      return new UserEntity('1', name, email, password, 'user', true, cityId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
