import { LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export interface IAuthDatasource {
  login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
