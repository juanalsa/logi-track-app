import { IAuthDatasource, IAuthRepository } from '../../application';
import { RegisterUserDto, UserEntity } from '../../domain';

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authDatasource: IAuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
