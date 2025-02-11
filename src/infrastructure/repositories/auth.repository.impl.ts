import { IAuthDatasource, IAuthRepository } from '../../application';
import { LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authDatasource: IAuthDatasource) {}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
